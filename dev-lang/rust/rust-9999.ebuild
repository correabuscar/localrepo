# src: https://github.com/Miezhiko/Overlay/blob/mawa/dev-lang/rust/rust-9999.ebuild
# Copyright 1999-2024 Gentoo Authors
# Distributed under the terms of the GNU General Public License v2

EAPI=8

PYTHON_COMPAT=( python3_{10..13} )

inherit bash-completion-r1 check-reqs estack flag-o-matic llvm multiprocessing \
	multilib multilib-build python-any-r1 rust-toolchain toolchain-funcs git-r3

#SLOT="stable/live"
SLOT="git"
KEYWORDS="~amd64"

DESCRIPTION="Systems programming language from Mozilla"
HOMEPAGE="https://www.rust-lang.org/"

# keep in sync with llvm ebuild of the same version as bundled one.
ALL_LLVM_TARGETS=( AArch64 AMDGPU ARM AVR BPF Hexagon Lanai Mips MSP430
	NVPTX PowerPC RISCV Sparc SystemZ WebAssembly X86 XCore )
ALL_LLVM_TARGETS=( "${ALL_LLVM_TARGETS[@]/#/llvm_targets_}" )
LLVM_TARGET_USEDEPS=${ALL_LLVM_TARGETS[@]/%/(-)?}

LICENSE="|| ( MIT Apache-2.0 ) BSD-1 BSD-2 BSD-4 UoI-NCSA"

IUSE="+clippy cpu_flags_x86_sse2 debug dist doc llvm-libunwind miri parallel-compiler profiler rls rustfmt rust-src +rust-analyzer +system-llvm test wasm ${ALL_LLVM_TARGETS[*]}"

# List all the working slots in LLVM_VALID_SLOTS, newest first.
LLVM_VALID_SLOTS=( 18 )
LLVM_MAX_SLOT="${LLVM_VALID_SLOTS[0]}"

# splitting usedeps needed to avoid CI/pkgcheck's UncheckableDep limitation
# (-) usedep needed because we may build with older llvm without that target
LLVM_DEPEND="|| ( "
for _s in ${LLVM_VALID_SLOTS[@]}; do
	LLVM_DEPEND+=" ( "
	for _x in ${ALL_LLVM_TARGETS[@]}; do
		LLVM_DEPEND+="
			${_x}? ( sys-devel/llvm:${_s}[${_x}(-)] )"
	done
	LLVM_DEPEND+=" )"
done
unset _s _x
LLVM_DEPEND+=" )
	<sys-devel/llvm-$(( LLVM_MAX_SLOT + 1 )):=
"

BDEPEND="${PYTHON_DEPS}
	app-eselect/eselect-rust
	|| (
		>=sys-devel/gcc-4.7
		>=sys-devel/clang-3.5
	)
	!system-llvm? (
		>=dev-build/cmake-3.13.4
		dev-build/ninja
	)
	test? ( sys-devel/gdb )
"

DEPEND="
	>=app-arch/xz-utils-5.2
	net-libs/libssh2:=
	net-libs/http-parser:=
	net-misc/curl:=[http2,ssl]
	sys-libs/zlib:=
	dev-libs/openssl:0=
	elibc_musl? ( sys-libs/libunwind:= )
	system-llvm? (
		${LLVM_DEPEND}
		llvm-libunwind? ( sys-libs/llvm-libunwind:= )
		>=sys-devel/clang-runtime-14.0
	)
	!system-llvm? (
		!llvm-libunwind? (
			elibc_musl? ( sys-libs/libunwind:= )
		)
	)
"

RDEPEND="${DEPEND}
	app-eselect/eselect-rust
	sys-apps/lsb-release
"

REQUIRED_USE="|| ( ${ALL_LLVM_TARGETS[*]} )
	rust-analyzer? ( rust-src )
	rls? ( rust-src )
	test? ( ${ALL_LLVM_TARGETS[*]} )
	wasm? ( llvm_targets_WebAssembly )
	x86? ( cpu_flags_x86_sse2 )
"

# we don't use cmake.eclass, but can get a warning
CMAKE_WARN_UNUSED_CLI=no

QA_FLAGS_IGNORED="
	usr/lib/${PN}/${PV}/bin/.*
	usr/lib/${PN}/${PV}/libexec/.*
	usr/lib/${PN}/${PV}/lib/lib.*.so
	usr/lib/${PN}/${PV}/lib/rustlib/.*/bin/.*
	usr/lib/${PN}/${PV}/lib/rustlib/.*/lib/lib.*.so
"

QA_SONAME="
	usr/lib/${PN}/${PV}/lib/lib.*.so.*
	usr/lib/${PN}/${PV}/lib/rustlib/.*/lib/lib.*.so
"

QA_PRESTRIPPED="
	usr/lib/${PN}/${PV}/lib/rustlib/.*/bin/rust-llvm-dwp
	usr/lib/${PN}/${PV}/lib/rustlib/.*/lib/self-contained/crtn.o
"

# An rmeta file is custom binary format that contains the metadata for the crate.
# rmeta files do not support linking, since they do not contain compiled object files.
# so we can safely silence the warning for this QA check.
QA_EXECSTACK="usr/lib/${PN}/${PV}/lib/rustlib/*/lib*.rlib:lib.rmeta"

#from 1.78.0 ebuild:
S="${WORKDIR}/${MY_P}-src"

# causes double bootstrap
RESTRICT="test"
#In the past this was in RESTRICT: "When network-sandbox is added to RESTRICT, it allows the ebuild to access the network during the build process. This might be necessary for packages that need to download additional resources or dependencies that are not included in the main source tarball."

toml_usex() {
	usex "${1}" true false
}

pre_build_checks() {
	local M=9192
	# multiply requirements by 1.3 if we are doing x86-multilib
	if use amd64; then
		M=$(( $(usex abi_x86_32 13 10) * ${M} / 10 ))
	fi
	M=$(( $(usex clippy 128 0) + ${M} ))
	M=$(( $(usex miri 128 0) + ${M} ))
	M=$(( $(usex rls 512 0) + ${M} ))
	M=$(( $(usex rustfmt 256 0) + ${M} ))
	# add 2G if we compile llvm and 256M per llvm_target
	if ! use system-llvm; then
		M=$(( 2048 + ${M} ))
		local ltarget
		for ltarget in ${ALL_LLVM_TARGETS[@]}; do
			M=$(( $(usex ${ltarget} 256 0) + ${M} ))
		done
	fi
	M=$(( $(usex wasm 256 0) + ${M} ))
	M=$(( $(usex debug 2 1) * ${M} ))
	eshopts_push -s extglob
	if is-flagq '-g?(gdb)?([1-9])'; then
		M=$(( 15 * ${M} / 10 ))
	fi
	eshopts_pop
	M=$(( $(usex doc 256 0) + ${M} ))
	M=$(( 61000 + ${M} )) #takes 61G so to be sure add wtw else they think it would take, for crazy safety.
	#current ebuild (29nov2020) took 60mins to compile (mitigations=2) and 60G in /var/tmp/portage (oddly 610M left even tho it was a 64G ext4 zram
	CHECKREQS_DISK_BUILD=${M}M check-reqs_pkg_${EBUILD_PHASE}
}

llvm_check_deps() {
	has_version -r "sys-devel/llvm:${LLVM_SLOT}[${LLVM_TARGET_USEDEPS// /,}]"
}

pkg_pretend() {
	pre_build_checks
}

pkg_setup() {
	pre_build_checks
	python-any-r1_pkg_setup

	# required to link agains system libs, otherwise
	# crates use bundled sources and compile own static version
	export LIBGIT2_SYS_USE_PKG_CONFIG=1
	export LIBGIT2_NO_PKG_CONFIG=0 #749381
	export LIBSSH2_SYS_USE_PKG_CONFIG=1
	export PKG_CONFIG_ALLOW_CROSS=1

	if use system-llvm; then
		llvm_pkg_setup

		local llvm_config="$(get_llvm_prefix "${LLVM_MAX_SLOT}")/bin/llvm-config"
		export LLVM_LINK_SHARED=1
		export RUSTFLAGS="${RUSTFLAGS} -Lnative=$("${llvm_config}" --libdir)"
	fi
}

src_unpack() {
	EGIT_REPO_URI="https://github.com/rust-lang/rust.git"
	EGIT_BRANCH="master"
	EGIT_SUBMODULES=( '*' )
	EGIT_CHECKOUT_DIR="${WORKDIR}/${P}"

	git-r3_src_unpack
	default # Call the default src_unpack implementation "In Gentoo ebuilds, the default function is a helper function provided by the eclass framework. It allows an ebuild to call the default implementation of a given phase function provided by the eclasses the ebuild inherits from. This is useful when you want to add some custom behavior to a phase but also want to retain the default behavior defined by the eclasses."

	cd ${S}

	if use system-llvm; then
		rm -rf src/llvm-project/{clang,clang-tools-extra,compiler-rt,lld,lldb,llvm}
		rm -rf src/llvm-project/libunwind/*
		# We never enable emscripten.
		rm -rf src/llvm-emscripten/
		# We never enable other LLVM tools.
		rm -rf src/tools/clang
		rm -rf src/tools/lld
		rm -rf src/tools/lldb
		# CI tooling won't be used
		rm -rf src/ci
	fi

	# Remove other unused vendored libraries
	rm -rf vendor/*jemalloc-sys*/jemalloc/
	rm -rf vendor/libmimalloc-sys/c_src/mimalloc/
	rm -rf vendor/openssl-src/openssl/

	# Remove hidden files from source
	find src/ -type f -name '.appveyor.yml' -exec rm -v '{}' '+'
	find src/ -type f -name '.travis.yml' -exec rm -v '{}' '+'
	find src/ -type f -name '.cirrus.yml' -exec rm -v '{}' '+'

	# This only affects the transient rust-installer, but let it use our dynamic xz-libs
	sed -i.lzma -e '/LZMA_API_STATIC/d' src/bootstrap/tool.rs

	# Sometimes Rust sources start with #![...] attributes, and "smart" editors think
	# it's a shebang and make them executable. Then brp-mangle-shebangs gets upset...
	find -name '*.rs' -type f -perm /111 -exec chmod -v -x '{}' '+'

	#we don't need this: https://github.com/Miezhiko/Overlay/blob/mawa/dev-lang/rust/files/0002-compiler-Change-LLVM-targets.patch
	#so, commented out:
	#eapply "${FILESDIR}"/0002-compiler-Change-LLVM-targets.patch
	eapply "${FILESDIR}/1.78.0-musl-dynamic-linking.patch"
	eapply "${FILESDIR}/1.78.0-ignore-broken-and-non-applicable-tests.patch"
	eapply "${FILESDIR}"/1.74.1-cross-compile-libz.patch
	#"${FILESDIR}"/1.72.0-bump-libc-deps-to-0.2.146.patch  # pending refresh
	eapply "${FILESDIR}"/1.67.0-doc-wasm.patch

	local rust_target="" rust_targets="" arch_cflags

	# Collect rust target names to compile standard libs for all ABIs.
	for v in $(multilib_get_enabled_abi_pairs); do
		rust_targets="${rust_targets},\"$(rust_abi $(get_abi_CHOST ${v##*.}))\""
	done

	if use wasm; then
		rust_targets+=",\"wasm32-unknown-unknown\""
		if use system-llvm; then
			# un-hardcode rust-lld linker for this target
			# https://bugs.gentoo.org/715348
			sed -i '/linker:/ s/rust-lld/wasm-ld/' compiler/rustc_target/src/spec/base/wasm.rs || die
		fi
	fi

	rust_targets="${rust_targets#,}"

	local tools='"cargo","rustdoc"'
	use clippy && tools+=',"clippy"'
	use miri && tools+=',"miri"'
	use profiler && tools+=',"rust-demangler"'
	use rustfmt && tools+=',"rustfmt"'
	use rust-analyzer && tools+=',"rust-analyzer","rust-analyzer-proc-macro-srv"'
	use rust-src && tools+=',"src"'

	rust_target="$(rust_abi)"

	local cm_btype="$(usex debug DEBUG RELEASE)"
	cat <<- _EOF_ > "${S}"/config.toml
		changelog-seen = 2
		# see what each of these mean at: https://github.com/rust-lang/rust/blob/master/config.example.toml
		[llvm]
		download-ci-llvm = false
		optimize = true
		thin-lto =  $(toml_usex system-llvm)
		#release-debuginfo = $(toml_usex debug)
		release-debuginfo = true
		assertions = $(toml_usex debug)
		ccache = "/usr/bin/ccache"
		ninja = true
		targets = "${LLVM_TARGETS// /;}"
		experimental-targets = ""
		link-jobs = $(makeopts_jobs)
		link-shared =  $(toml_usex system-llvm)
		$(if is_libcxx_linked; then
		  # https://bugs.gentoo.org/732632
		  echo "use-libcxx = true"
		  echo "static-libstdcpp = false"
		  else
			echo "static-libstdcpp = $(usex system-llvm false true)"
			echo "use-libcxx = false"
		fi)
		$(case "${rust_target}" in
		  i586-*-linux-*)
			# https://github.com/rust-lang/rust/issues/93059
			echo 'cflags = "-fcf-protection=none"'
			echo 'cxxflags = "-fcf-protection=none"'
			echo 'ldflags = "-fcf-protection=none"'
			;;
		  *)
			;;
		esac)
		enable-warnings = false

		[llvm.build-config]
		CMAKE_VERBOSE_MAKEFILE = "ON"
		$(if ! tc-is-cross-compiler; then
		  # When cross-compiling, LLVM is compiled twice, once for host and
		  # once for target.  Unfortunately, this build configuration applies
		  # to both, which means any flags applicable to one target but not
		  # the other will break.  Conditionally disable respecting user
		  # flags when cross-compiling.
		  echo "CMAKE_C_FLAGS_${cm_btype} = \"${CFLAGS}\""
		  echo "CMAKE_CXX_FLAGS_${cm_btype} = \"${CXXFLAGS}\""
		  echo "CMAKE_EXE_LINKER_FLAGS_${cm_btype} = \"${LDFLAGS}\""
		  echo "CMAKE_MODULE_LINKER_FLAGS_${cm_btype} = \"${LDFLAGS}\""
		  echo "CMAKE_SHARED_LINKER_FLAGS_${cm_btype} = \"${LDFLAGS}\""
		  echo "CMAKE_STATIC_LINKER_FLAGS_${cm_btype} = \"${ARFLAGS}\""
		fi)
		#CMAKE_C_FLAGS_${cm_btype} = "${CFLAGS}"
		#CMAKE_CXX_FLAGS_${cm_btype} = "${CXXFLAGS}"
		#CMAKE_EXE_LINKER_FLAGS_${cm_btype} = "${LDFLAGS}"
		#CMAKE_MODULE_LINKER_FLAGS_${cm_btype} = "${LDFLAGS}"
		#CMAKE_SHARED_LINKER_FLAGS_${cm_btype} = "${LDFLAGS}"
		#CMAKE_STATIC_LINKER_FLAGS_${cm_btype} = "${ARFLAGS}"

		[build]
		build-stage = 2
		test-stage = 2
		doc-stage = 2
		# Build triple for the pre-compiled snapshot compiler. If `rustc` is set, this must match its host
		# triple (see `rustc --version --verbose`; cross-compiling the rust build system itself is NOT
		# supported). If `rustc` is unset, this must be a platform with pre-compiled host tools
		# (https://doc.rust-lang.org/nightly/rustc/platform-support.html). The current platform must be
		# able to run binaries of this build triple.
		#
		# If `rustc` is present in path, this defaults to the host it was compiled for.
		# Otherwise, `x.py` will try to infer it from the output of `uname`.
		# If `uname` is not found in PATH, we assume this is `x86_64-pc-windows-msvc`.
		# This may be changed in the future.
		#build = "x86_64-unknown-linux-gnu" (as an example)
		build = "${rust_target}"

		# Which triples to produce a compiler toolchain for. Each of these triples will be bootstrapped from
		# the build triple themselves. In other words, this is the list of triples for which to build a
		# compiler that can RUN on that triple.
		#
		# Defaults to just the `build` triple.
		#host = [build.build] (list of triples)
		host = ["${rust_target}"]

		# Which triples to build libraries (core/alloc/std/test/proc_macro) for. Each of these triples will
		# be bootstrapped from the build triple themselves. In other words, this is the list of triples for
		# which to build a library that can CROSS-COMPILE to that triple.
		#
		# Defaults to `host`. If you set this explicitly, you likely want to add all
		# host triples to this list as well in order for those host toolchains to be
		# able to compile programs for their native target.
		#target = build.host (list of triples)
		target = [${rust_targets}]

		docs = $(toml_usex doc)
		compiler-docs = $(toml_usex doc)
		#
		submodules = false
		#
		python = "${EPYTHON}"
		locked-deps = false
		#TODO: had this to true ^ locked-deps
		vendor = false
		extended = true
		tools = [${tools}]
		# Verbosity level: 0 == not verbose, 1 == verbose, 2 == very verbose
		verbose = 2
		sanitizers = false
		profiler = $(toml_usex profiler)
		cargo-native-static = false
		low-priority = true
		print-step-timings = true
		# Indicates that a local rebuild is occurring instead of a full bootstrap,
		# essentially skipping stage0 as the local compiler is recompiling itself again.
		# Useful for modifying only the stage2 compiler without having to pass `--keep-stage 0` each time.
		local-rebuild = false

		[install]
		prefix = "${EPREFIX}/usr/lib/${PN}/${PV}"
		sysconfdir = "etc"
		docdir = "share/doc/rust"
		bindir = "bin"
		libdir = "lib"
		mandir = "share/man"

		[rust]
		# https://github.com/rust-lang/rust/issues/54872
		codegen-units-std = 1
		optimize = true
		debug = $(toml_usex debug)
		#debug-assertions = $(toml_usex debug)
		#debug-assertions = true
		#XXX: ^ that's too crazy, I'm sure!
		debug-assertions = false

		#debug-assertions-std = $(toml_usex debug)
		debug-assertions-std = true
		#debuginfo-level = $(usex debug 2 0)
		#debuginfo-level-rustc = $(usex debug 2 0)
		#debuginfo-level-std = $(usex debug 2 0)
		#debuginfo-level-tools = $(usex debug 2 0)
		#debuginfo-level-tests = 0
		#0: No debug information is generated. This results in the smallest binary size but provides no debugging support.
		#1: Generate minimal debug information, usually limited to function names and line numbers. This is useful for basic debugging but doesn't include variable names or type information.
		#2: Generate full debug information, including variable names, type information, and other metadata. This is most helpful for comprehensive debugging and profiling but can significantly increase binary size.
		debuginfo-level = 2
		debuginfo-level-rustc = 2
		debuginfo-level-std = 2
		debuginfo-level-tools = 2
		debuginfo-level-tests = 2

		# Whether or not `panic!`s generate backtraces (RUST_BACKTRACE)
		#backtrace = $(toml_usex debug)
		backtrace = true

		# Print backtrace on internal compiler errors during bootstrap
		backtrace-on-ice = true

		incremental = false
		default-linker = "$(tc-getCC)"
		parallel-compiler = $(toml_usex parallel-compiler)
		channel = "nightly"
		description = "gentoo"
		rpath = false

		# Prints each test name as it is executed, to help debug issues in the test harness itself.
		#verbose-tests = false
		verbose-tests = true

		# Flag indicating whether tests are compiled with optimizations (the -O flag).
		optimize-tests = $(toml_usex !debug)

		# Flag indicating whether codegen tests will be run or not. If you get an error
		# saying that the FileCheck executable is missing, you may want to disable this.
		# Also see the target's llvm-filecheck option.
		#codegen-tests = true
		codegen-tests = $(toml_usex debug)

		# Whether to create a source tarball by default when running `x dist`.
		# You can still build a source tarball when this is disabled by explicitly passing `x dist rustc-src`.
		dist-src = $(toml_usex debug)

		remap-debuginfo = $(toml_usex debug)
		lld = $(usex system-llvm false $(toml_usex wasm))
		# only deny warnings if doc+wasm are NOT requested, documenting stage0 wasm std fails without it
		# https://github.com/rust-lang/rust/issues/74976
		# https://github.com/rust-lang/rust/issues/76526
		deny-warnings = $(usex wasm $(usex doc false true) true)
		jemalloc = false
		llvm-libunwind = "$(usex system-llvm system)"

		[dist]
		src-tarball = false
		#compression-formats = ["xz"]
		# Available options: fast, balanced, best, no-op
		# no-op is auto-chosen on ./x.py install due to https://github.com/rust-lang/rust/commit/26cd5d862e22c013ecb3396b177d3af80e95c836 ) ie. on gentoo
		compression-profile = "fast"
		compression-formats = ["none"]
		#patch made!'none' here means .tar only! or don't set any value here! oldcomments://nvm patch not made! //keep 'gz' here so that 0600_fabricate_neutering_try2_just_tar_not_gz_or_xz_for_rust_1_52_0.patch applies neatly
		#doneTODO: try compression-formats 'cat'(not valid!) or just make sure it doesn't use any! However list must not be empty! as per https://github.com/rust-lang/rust/blob/abf3ec5b3353be973b18269fcdda76a59743f235/config.toml.example#L696 see: https://github.com/rust-lang/rust-installer/issues/110
		#missing-tools = false
		#^ this won't work (either with =false or =true), it fails to compile miri even though USE=-miri due to /var/db/repos/gentoo/profiles/base/package.use.mask:30 so it has to be =true
	_EOF_

	for v in $(multilib_get_enabled_abi_pairs); do
		rust_target=$(rust_abi $(get_abi_CHOST ${v##*.}))
		arch_cflags="$(get_abi_CFLAGS ${v##*.})"

		cat <<- _EOF_ >> "${S}"/config.env
			CFLAGS_${rust_target}=${arch_cflags}
		_EOF_

		cat <<- _EOF_ >> "${S}"/config.toml
			[target.${rust_target}]
			ar = "$(tc-getAR)"
			cc = "$(tc-getCC)"
			cxx = "$(tc-getCXX)"
			linker = "$(tc-getCC)"
			ranlib = "$(tc-getRANLIB)"
			#llvm-libunwind = "$(usex llvm-libunwind $(usex system-llvm system in-tree) no)"
		_EOF_
		if use system-llvm; then
			cat <<- _EOF_ >> "${S}"/config.toml
				llvm-config = "$(get_llvm_prefix "${LLVM_MAX_SLOT}")/bin/llvm-config"
			_EOF_
		fi
		# by default librustc_target/spec/linux_musl_base.rs sets base.crt_static_default = true;
		# but we patch it and set to false here as well
		if use elibc_musl; then
			cat <<- _EOF_ >> "${S}"/config.toml
				crt-static = false
			_EOF_
		fi
	done
	if use wasm; then
		wasm_target="wasm32-unknown-unknown"
		export CFLAGS_${wasm_target//-/_}="$(filter-flags '-mcpu*' '-march*' '-mtune*'; echo "$CFLAGS")"
		cat <<- _EOF_ >> "${S}"/config.toml
		  [target.wasm32-unknown-unknown]
		  linker = "$(usex system-llvm lld rust-lld)"
		  # wasm target does not have profiler_builtins https://bugs.gentoo.org/848483
		  profiler = false
		_EOF_
	fi

	if [[ -n ${I_KNOW_WHAT_I_AM_DOING_CROSS} ]]; then # whitespace intentionally shifted below

	# BUG: we can't pass host flags to cross compiler, so just filter for now
	# BUG: this should be more fine-grained.
	filter-flags '-mcpu=*' '-march=*' '-mtune=*'

	local cross_target_spec
	for cross_target_spec in "${RUST_CROSS_TARGETS[@]}";do
		# extracts first element form <LLVM target>:<rust-target>:<CTARGET>
		local cross_llvm_target="${cross_target_spec%%:*}"
		# extracts toolchain triples, <rust-target>:<CTARGET>
		local cross_triples="${cross_target_spec#*:}"
		# extracts first element after before : separator
		local cross_rust_target="${cross_triples%%:*}"
		# extracts last element after : separator
		local cross_toolchain="${cross_triples##*:}"
		use llvm_targets_${cross_llvm_target} || die "need llvm_targets_${cross_llvm_target} target enabled"
		command -v ${cross_toolchain}-gcc > /dev/null 2>&1 || die "need ${cross_toolchain} cross toolchain"

		cat <<- _EOF_ >> "${S}"/config.toml
			[target.${cross_rust_target}]
			ar = "${cross_toolchain}-ar"
			cc = "${cross_toolchain}-gcc"
			cxx = "${cross_toolchain}-g++"
			linker = "${cross_toolchain}-gcc"
			ranlib = "${cross_toolchain}-ranlib"
		_EOF_
		if use system-llvm; then
			cat <<- _EOF_ >> "${S}"/config.toml
				llvm-config = "$(get_llvm_prefix "${LLVM_MAX_SLOT}")/bin/llvm-config"
			_EOF_
		fi
		if [[ "${cross_toolchain}" == *-musl* ]]; then
			cat <<- _EOF_ >> "${S}"/config.toml
				musl-root = "$(${cross_toolchain}-gcc -print-sysroot)/usr"
			_EOF_
		fi

		# append cross target to "normal" target list
		# example 'target = ["powerpc64le-unknown-linux-gnu"]'
		# becomes 'target = ["powerpc64le-unknown-linux-gnu","aarch64-unknown-linux-gnu"]'

		rust_targets="${rust_targets},\"${cross_rust_target}\""
		sed -i '/^target = \[/ s#\[.*\]#\[${rust_targets}\]#' config.toml || die

		ewarn
		ewarn "Enabled ${cross_rust_target} rust target"
		ewarn "Using ${cross_toolchain} cross toolchain"
		ewarn
		if ! has_version -b 'sys-devel/binutils[multitarget]' ; then
			ewarn "'sys-devel/binutils[multitarget]' is not installed"
			ewarn "'strip' will be unable to strip cross libraries"
			ewarn "cross targets will be installed with full debug information"
			ewarn "enable 'multitarget' USE flag for binutils to be able to strip object files"
			ewarn
			ewarn "Alternatively llvm-strip can be used, it supports stripping any target"
			ewarn "define STRIP=\"llvm-strip\" to use it (experimental)"
			ewarn
		fi
	done
	fi # I_KNOW_WHAT_I_AM_DOING_CROSS

	einfo "Rust configured with the following flags:"
	echo
	echo RUSTFLAGS="${RUSTFLAGS:-}"
	echo RUSTFLAGS_BOOTSTRAP="${RUSTFLAGS_BOOTSTRAP:-}"
	echo RUSTFLAGS_NOT_BOOTSTRAP="${RUSTFLAGS_NOT_BOOTSTRAP:-}"
	env | grep "CARGO_TARGET_.*_RUSTFLAGS="
	cat "${S}"/config.env || die
	echo
	einfo "config.toml contents:"
	cat "${S}"/config.toml || die
	echo

	# we need \n IFS to have config.env with spaces loaded properly. #734018
	(
	IFS=$'\n'
	env $(cat "${S}"/config.env) RUST_BACKTRACE=1\
		"${EPYTHON}" ./x.py build -vv --config="${S}"/config.toml -j$(makeopts_jobs) || die
	)

	einfo "HOME is set to: ${HOME}"
	mv ${HOME}/.cargo ${S}/.cargo ||die "INSTALL VENDORING .cargo FAILED"

	# can't use image here because we need src_install
	mkdir -p "${S}"/instol || die
  (
	IFS=$'\n'
	env $(cat "${S}"/config.env) DESTDIR="${S}"/instol \
		"${EPYTHON}" ./x.py install	-vv --config="${S}"/config.toml -j$(makeopts_jobs) || die
	)
}

src_configure() { :; }

src_compile() { :; }

src_test() { :; }

src_install() {
	cp -prPRf "${S}"/instol/* "${D}"/ || die "INSTALL FAILED"

	local symlinks=(
		cargo
		rustc
		rustdoc
		rust-gdb
		rust-gdbgui
		rust-lldb
	)

	use clippy && symlinks+=( clippy-driver cargo-clippy )
	use miri && symlinks+=( miri cargo-miri )
	use profiler && symlinks+=( rust-demangler )
	use rustfmt && symlinks+=( rustfmt cargo-fmt )
	use rust-analyzer && symlinks+=( rust-analyzer )

	einfo "installing eselect-rust symlinks and paths: ${symlinks[@]}"
	local i
	for i in "${symlinks[@]}"; do
		# we need realpath on /usr/bin/* symlink return version-appended binary path.
		# so /usr/bin/rustc should point to /usr/lib/rust/<ver>/bin/rustc-<ver>
		# need to fix eselect-rust to remove this hack.
		local ver_i="${i}-${PV}"
		if [[ -f "${ED}/usr/lib/${PN}/${PV}/bin/${i}" ]]; then
			einfo "Installing ${i} symlink"
			ln -v "${ED}/usr/lib/${PN}/${PV}/bin/${i}" "${ED}/usr/lib/${PN}/${PV}/bin/${ver_i}" || die
		else
			ewarn "${i} symlink requested, but source file not found"
			ewarn "please report this"
		fi
		dosym "../lib/${PN}/${PV}/bin/${ver_i}" "/usr/bin/${ver_i}"
	done

	# symlinks to switch components to active rust in eselect
	dosym "${PV}/lib" "/usr/lib/${PN}/lib-${PV}"
	dosym "${PV}/libexec" "/usr/lib/${PN}/libexec-${PV}"
	dosym "${PV}/share/man" "/usr/lib/${PN}/man-${PV}"
	dosym "rust/${PV}/lib/rustlib" "/usr/lib/rustlib-${PV}"
	dosym "../../lib/${PN}/${PV}/share/doc/rust" "/usr/share/doc/${P}"

	newenvd - "50${P}" <<-_EOF_
		LDPATH="${EPREFIX}/usr/lib/rust/lib"
		MANPATH="${EPREFIX}/usr/lib/rust/man"
		$(use amd64 && usex elibc_musl 'CARGO_TARGET_X86_64_UNKNOWN_LINUX_MUSL_RUSTFLAGS="-C target-feature=-crt-static"' '')
		$(use arm64 && usex elibc_musl 'CARGO_TARGET_AARCH64_UNKNOWN_LINUX_MUSL_RUSTFLAGS="-C target-feature=-crt-static"' '')
	_EOF_

	rm -rf "${ED}/usr/lib/${PN}/${PV}"/*.old || die
	rm -rf "${ED}/usr/lib/${PN}/${PV}/doc"/*.old || die

	cat <<-_EOF_ > "${T}/provider-${P}"
		/usr/bin/cargo
		/usr/bin/rustdoc
		/usr/bin/rust-gdb
		/usr/bin/rust-gdbgui
		/usr/bin/rust-lldb
		/usr/lib/rustlib
		/usr/lib/rust/lib
		/usr/lib/rust/libexec
		/usr/lib/rust/man
		/usr/share/doc/rust
	_EOF_

	if use clippy; then
		echo /usr/bin/clippy-driver >> "${T}/provider-${P}"
		echo /usr/bin/cargo-clippy >> "${T}/provider-${P}"
	fi
	if use miri; then
		echo /usr/bin/miri >> "${T}/provider-${P}"
		echo /usr/bin/cargo-miri >> "${T}/provider-${P}"
	fi
	if use profiler; then
		echo /usr/bin/rust-demangler >> "${T}/provider-${P}"
	fi
	if use rustfmt; then
		echo /usr/bin/rustfmt >> "${T}/provider-${P}"
		echo /usr/bin/cargo-fmt >> "${T}/provider-${P}"
	fi
	if use rust-analyzer; then
		echo /usr/bin/rust-analyzer >> "${T}/provider-${P}"
	fi

	insinto /etc/env.d/rust
	doins "${T}/provider-${P}"

	if use dist; then
		"${EPYTHON}" ./x.py dist -vv --config="${S}"/config.toml -j$(makeopts_jobs) || die
		insinto "/usr/lib/${PN}/${PV}/dist"
		doins -r "${S}/build/dist/."
	fi
}

pkg_postinst() {
	eselect rust update

	if has_version sys-devel/gdb || has_version dev-util/lldb; then
		elog "Rust installs a helper script for calling GDB and LLDB,"
		elog "for your convenience it is installed under /usr/bin/rust-{gdb,lldb}-${PV}."
	fi

	if has_version app-editors/emacs; then
		elog "install app-emacs/rust-mode to get emacs support for rust."
	fi

	if has_version app-editors/gvim || has_version app-editors/vim; then
		elog "install app-vim/rust-vim to get vim support for rust."
	fi
}

pkg_postrm() {
	eselect rust cleanup
}
