"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { toText, getImageUrl } from "@/lib/utils";
import { getReserveUrl } from "@/lib/reserve";
import type { SiteSettings } from "@/types/microcms";

const NAV_ITEMS = [
  { href: "#concept", label: "コンセプト" },
  { href: "#for-whom", label: "こんな方に" },
  { href: "#why-us", label: "選ばれる理由" },
  { href: "/menu", label: "メニュー・料金" },
  { href: "/testimonials", label: "お客様の声" },
  { href: "/staff", label: "施術者紹介" },
  { href: "/access", label: "アクセス" },
];

type Props = {
  settings: SiteSettings | null;
};

export function Header({ settings }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const reserveMode = settings?.reserveMode ?? "link";
  const reserveUrl = getReserveUrl(reserveMode, settings?.reserveUrl);
  const reserveHref = reserveUrl ?? "/reserve";
  const reserveExternal = Boolean(reserveUrl);
  const clinicName = toText(settings?.clinicName) || "整体院";
  const logoUrl = getImageUrl(settings?.logo) || getImageUrl(settings?.logoImage);
  const showLogo = logoUrl.length > 0;

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkClass =
    "whitespace-nowrap py-2.5 text-sm text-neutral-600 hover:text-primary sm:py-3";
  const linkClassMobile =
    "block py-4 text-[15px] font-medium text-neutral-800 hover:text-primary border-b border-neutral-100 last:border-b-0";

  const renderLink = (item: (typeof NAV_ITEMS)[0], isMobile: boolean) => {
    const isExternal = item.href.startsWith("http");
    const isAnchor = item.href.startsWith("#");
    const className = isMobile ? linkClassMobile : linkClass;

    if (isExternal) {
      return (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          onClick={isMobile ? closeMenu : undefined}
        >
          {item.label}
        </a>
      );
    }
    if (isAnchor) {
      return (
        <Link
          key={item.href}
          href={`/${item.href}`}
          className={className}
          onClick={isMobile ? closeMenu : undefined}
        >
          {item.label}
        </Link>
      );
    }
    return (
      <Link
        key={item.href}
        href={item.href}
        className={className}
        onClick={isMobile ? closeMenu : undefined}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/98 backdrop-blur-sm">
      <div className="relative z-40 flex h-14 items-center justify-between px-4 sm:h-16 sm:px-10 lg:px-16">
        <Link href="/" className="shrink-0" onClick={closeMenu}>
          {showLogo ? (
            <Image
              src={logoUrl}
              alt={clinicName}
              width={140}
              height={44}
              className="h-8 w-auto object-contain sm:h-9"
              priority
            />
          ) : (
            <span className="font-serif text-lg font-medium text-primary sm:text-xl">
              {clinicName}
            </span>
          )}
        </Link>

        {/* デスクトップナビ（1024px以上で表示・オーバー防止） */}
        <nav
          className="hidden flex-1 items-center justify-end gap-4 lg:flex lg:gap-5 xl:gap-6 xl:mr-8"
          aria-label="メインメニュー"
        >
          {NAV_ITEMS.map((item) => renderLink(item, false))}
        </nav>

        {/* デスクトップ：予約ボタン */}
        <a
          href={reserveHref}
          {...(reserveExternal && { target: "_blank", rel: "noopener noreferrer" })}
          className="hidden shrink-0 whitespace-nowrap border border-primary bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover hover:border-primary-hover lg:inline-flex lg:px-6 lg:py-3"
        >
          予約する
        </a>

        {/* ハンバーガーボタン（1024px未満・右寄せ・3本線等間隔・押すと×表示） */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          className="relative ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded lg:hidden"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span
            className={`absolute left-1/2 block h-0.5 w-5 -translate-x-1/2 bg-neutral-700 transition-all duration-200 ${
              menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[calc(50%-8px)] -translate-y-1/2"
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 bg-neutral-700 transition-all duration-200 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-1/2 block h-0.5 w-5 -translate-x-1/2 bg-neutral-700 transition-all duration-200 ${
              menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-[calc(50%+8px)] -translate-y-1/2"
            }`}
          />
        </button>
      </div>

      {/* オーバーレイメニュー（1024px未満）・マージンなしパディングで余白 */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-30 pt-14 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
        style={{ transition: "visibility 0.2s, opacity 0.2s", backgroundColor: "#ffffff" }}
        aria-hidden={!menuOpen}
      >
        <nav className="flex max-h-[calc(100vh-5rem)] flex-col overflow-y-auto border-t border-neutral-200 bg-white px-4 pb-4 pt-4 text-right" aria-label="メニュー">
          {NAV_ITEMS.map((item) => renderLink(item, true))}
          <a
            href={reserveHref}
            {...(reserveExternal && { target: "_blank", rel: "noopener noreferrer" })}
            className="mt-6 flex h-12 w-full items-center justify-center rounded-lg border-2 border-primary bg-primary text-[15px] font-medium text-white hover:bg-primary-hover"
            onClick={closeMenu}
          >
            予約する
          </a>
        </nav>
      </div>
    </header>
  );
}
