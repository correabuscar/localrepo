# src: https://github.com/Miezhiko/Overlay/raw/mawa/virtual/rust/rust-9999.ebuild
# Copyright 1999-2024 Gentoo Authors
# Distributed under the terms of the GNU General Public License v2

EAPI=8

inherit multilib-build

DESCRIPTION="Virtual for Rust language compiler"

LICENSE=""

# adjust when rust upstream bumps internal llvm
# we do not allow multiple llvm versions in dev-lang/rust for
# neither system nor bundled, so we just hardcode it here.
SLOT="0/llvm-18"

#KEYWORDS=""
KEYWORDS="~amd64 ~arm ~arm64 ~loong ~ppc ~ppc64 ~riscv ~s390 ~sparc ~x86"
#IUSE="rustfmt"
IUSE="profiler rustfmt"

BDEPEND=""
#sureTODO: do we need 'profile' too from: rust-1.76.0.ebuild
#RDEPEND="~dev-lang/rust-${PV}[rustfmt?,${MULTILIB_USEDEP}]"
#TODO: do we need rust-bin? allowing for now
RDEPEND="|| (
	~dev-lang/rust-bin-${PV}[profiler?,rustfmt?,${MULTILIB_USEDEP}]
	~dev-lang/rust-${PV}[profiler?,rustfmt?,${MULTILIB_USEDEP}]
)"
