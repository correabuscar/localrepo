# src: https://github.com/Miezhiko/Overlay/raw/mawa/virtual/rust/rust-9999.ebuild
# Copyright 1999-2024 Gentoo Authors
# Distributed under the terms of the GNU General Public License v2

EAPI=8

inherit multilib-build

DESCRIPTION="Virtual for Rust language compiler"

LICENSE=""

SLOT="0/llvm-17"

KEYWORDS=""
IUSE="rustfmt"

BDEPEND=""
RDEPEND="~dev-lang/rust-${PV}[rustfmt?,${MULTILIB_USEDEP}]"
