# Copyright 1999-2021 Gentoo Authors
# Distributed under the terms of the GNU General Public License v2

EAPI=7

inherit cmake flag-o-matic xdg

DESCRIPTION="KeePassXC - KeePass Cross-platform Community Edition"
HOMEPAGE="https://keepassxc.org"

if [[ "${PV}" != 9999 ]] ; then
	if [[ "${PV}" == *_beta* ]] ; then
		SRC_URI="https://github.com/keepassxreboot/keepassxc/archive/${PV/_/-}.tar.gz -> ${P}.tar.gz"
		S="${WORKDIR}/${P/_/-}"
	else
		#SRC_URI="https://github.com/keepassxreboot/keepassxc/archive/${PV}.tar.gz -> ${P}.tar.gz"
		SRC_URI="https://github.com/keepassxreboot/keepassxc/releases/download/${PV}/${P}-src.tar.xz"
		KEYWORDS="~amd64 ~arm64 ~ppc64 ~x86"
	fi
else
	inherit git-r3
	EGIT_REPO_URI="https://github.com/keepassxreboot/${PN}"
	KEYWORDS="~amd64 ~x86"
fi

LICENSE="LGPL-2.1 GPL-2 GPL-3"
SLOT="0"
IUSE="doc autotype browser ccache keeshare +network test yubikey"

RESTRICT="!test? ( test )"

RDEPEND="
	app-crypt/argon2:=
	dev-libs/libgcrypt:=
	>=dev-libs/libsodium-1.0.12:=
	dev-qt/qtconcurrent:5
	dev-qt/qtcore:5
	dev-qt/qtdbus:5
	dev-qt/qtgui:5
	dev-qt/qtnetwork:5
	dev-qt/qtsvg:5
	dev-qt/qtwidgets:5
	media-gfx/qrencode:=
	sys-libs/readline:0=
	sys-libs/zlib:=
	autotype? (
		dev-qt/qtx11extras:5
		x11-libs/libX11
		x11-libs/libXi
		x11-libs/libXtst
	)
	keeshare? ( dev-libs/quazip:0= )
	yubikey? ( sys-auth/ykpers )
	>=dev-libs/botan-2.18.0
"

DEPEND="
	${RDEPEND}
	dev-qt/linguist-tools:5
	dev-qt/qttest:5
"
BDEPEND="
	ccache? ( dev-util/ccache )
	doc? ( dev-ruby/asciidoctor )
"

PATCHES=( "${FILESDIR}"/${PN}-2.6.4-quazip1.patch ) # pending upstream PR#5511

src_prepare() {
	 use test || \
		sed -e "/^find_package(Qt5Test/d" -i CMakeLists.txt || die

	 cmake_src_prepare
}

src_configure() {
	# https://github.com/keepassxreboot/keepassxc/issues/5801
	filter-flags -flto*

	local mycmakeargs=(
        -DWITH_XC_ALL=OFF
		-DWITH_CCACHE="$(usex ccache)"
		-DWITH_GUI_TESTS=OFF
		-DWITH_TESTS="$(usex test)"
		-DWITH_XC_AUTOTYPE="$(usex autotype)"
		-DWITH_XC_DOCS="$(usex doc)"
		-DWITH_XC_BROWSER="$(usex browser)"
		#-DWITH_XC_FDOSECRETS=ON
        -DWITH_XC_FDOSECRETS=OFF
		-DWITH_XC_KEESHARE="$(usex keeshare)"
        -DWITH_XC_KEESHARE_SECURE="$(usex keeshare ON OFF)" #usex <USE flag> [true output] [false output] [true suffix] [false suffix]  src: https://devmanual.gentoo.org/eclass-reference/ebuild/
        #XXX: apparently the yes/no that usex yields by default is ok to cmake as per https://cmake.org/cmake/help/latest/command/if.html
        #if(<constant>)   True if the constant is 1, ON, YES, TRUE, Y, or a non-zero number. False if the constant is 0, OFF, NO, FALSE, N, IGNORE, NOTFOUND, the empty string, or ends in the suffix -NOTFOUND. Named boolean constants are case-insensitive. If the argument is not one of these specific constants, it is treated as a variable or string and the following signature is used.
		-DWITH_XC_NETWORKING="$(usex network)"
		#-DWITH_XC_SSHAGENT=ON
        -DWITH_XC_SSHAGENT=OFF
		-DWITH_XC_UPDATECHECK=OFF
		-DWITH_XC_YUBIKEY="$(usex yubikey)"
        -DWITH_APP_BUNDLE=OFF
        -DKEEPASSXC_BUILD_TYPE=Release #-DKEEPASSXC_BUILD_TYPE=[Snapshot|PreRelease|Release] Set the build type to show/hide stability warnings (default: "Snapshot")
        -DCMAKE_BUILD_TYPE=RelWithDebInfo
        -DCMAKE_VERBOSE_MAKEFILE=ON
        -DWITH_XC_TOUCHID=OFF
    )
	if [[ "${PV}" == *_beta* ]] ; then
		mycmakeargs+=( -DOVERRIDE_VERSION="${PV/_/-}" )
	fi
	cmake_src_configure
}
