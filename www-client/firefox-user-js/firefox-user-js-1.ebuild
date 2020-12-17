# Copyright 2018 Haelwenn (lanodan) Monnier <contact@hacktivis.me>
# Distributed under the terms of the GNU General Public License v2

EAPI=7

#inherit git-r3

DESCRIPTION="Firefox configuration hardening"
HOMEPAGE="https://github.com/pyllyukko/user.js"
SLOT="0"
LICENSE="MIT"

KEYWORDS="~amd64 ~x86 amd64 x86"

#EGIT_REPO_URI="${HOMEPAGE}.git"

src_unpack() {
	mkdir -p "$S"
}

src_prepare() {
	default

	#cp "${FILESDIR}/local-settings.js" .
	cp "${FILESDIR}/user.js" .

	#sed -i 's/tests/test/' Makefile || die "Failed changing tests to test"
	#sed -i '{/all:/ s/test//}' Makefile || die "Failed removing test from ``make all``"
	#sed -i '{/test:/ s/acorn//}' Makefile || die "Failed removing acorn (unknown command) from test"
}

src_compile() {
	#default
	#emake systemwide_user.js

	# sed -re 's/\buser_pref\b/pref/g' -i user.js
	sed -re 's/\buser_pref\b/pref/g' user.js > vendor.js
}

src_install() {
	insinto /usr/$(get_libdir)/firefox/browser/defaults/preferences/
	#^ that's /usr/lib64/firefox/browser/defaults/preferences/vendor.js
	#insinto /usr/$(get_libdir)/firefox
	#newins user.js mozilla.cfg
	#newins user.js vendor.js
	doins vendor.js

	#insinto /usr/lib/firefox/defaults/pref/
	#doins local-settings.js
}
