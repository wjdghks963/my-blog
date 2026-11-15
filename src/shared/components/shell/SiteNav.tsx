"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const LINKS: { text: string; href: string }[] = [
  { text: "Home", href: "/" },
  { text: "Blogs", href: "/blogs" },
  { text: "3D Space", href: "/3d-space" },
  { text: "About", href: "/about-me" },
  { text: "Update", href: "/update-note" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function ModeChip() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "라이트 모드로 변경" : "다크 모드로 변경"}
      aria-pressed={isDark}
      className="inline-flex items-center gap-1.5"
      style={{
        background: "transparent",
        border: "1px solid var(--rule)",
        color: "var(--ink-2)",
        padding: "4px 10px",
        borderRadius: 100,
        fontSize: 11,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}
    >
      <span
        aria-hidden
        style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ink)", display: "inline-block" }}
      />
      {mounted ? (isDark ? "Dark" : "Light") : "Theme"}
    </button>
  );
}

function Brand() {
  return (
    <Link
      href="/"
      className="font-serif"
      style={{ fontSize: 21, fontWeight: 600, letterSpacing: "-0.01em", color: "var(--ink)" }}
    >
      Junglog<span style={{ color: "var(--accent)" }}>.</span>
    </Link>
  );
}

function NavList({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <ul className="flex flex-col" style={{ margin: 0, padding: 0, listStyle: "none" }}>
      {LINKS.map((l, i) => {
        const active = isActive(pathname, l.href);
        return (
          <li key={l.href} style={{ borderBottom: "1px solid var(--rule-2)" }}>
            <Link
              href={l.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className="site-nav-link flex items-baseline gap-3"
              style={{
                padding: "11px 0",
                fontSize: 14,
                color: active ? "var(--ink)" : "var(--ink-3)",
                fontWeight: active ? 600 : 400,
              }}
            >
              <span
                className="font-mono"
                style={{ fontSize: 10.5, color: active ? "var(--accent)" : "var(--ink-4)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{l.text}</span>
              {active && (
                <span aria-hidden style={{ marginLeft: "auto", color: "var(--accent)" }}>
                  ●
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function SiteNav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  // 페이지가 바뀌면 드로어를 닫는다
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Desktop: 좌측 사이드바 */}
      <aside className="site-sidebar hidden lg:flex">
        <div>
          <Brand />
          <div className="tiny-label" style={{ color: "var(--ink-3)", fontWeight: 500, marginTop: 6 }}>
            est. 2024
          </div>
        </div>

        <nav aria-label="주요 메뉴" style={{ marginTop: 36, borderTop: "2px solid var(--ink)" }}>
          <NavList pathname={pathname} />
        </nav>

        <div style={{ marginTop: "auto" }}>
          <ModeChip />
        </div>
      </aside>

      {/* Mobile / tablet: 상단 바 + 드로어 */}
      <header className="site-topbar lg:hidden">
        <div className="shell-x flex h-full items-center justify-between gap-4">
          <Brand />
          <div className="flex items-center gap-2.5">
            <ModeChip />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-drawer"
              aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
              style={{
                border: "1px solid var(--rule)",
                color: "var(--ink-2)",
                padding: "4px 10px",
                borderRadius: 100,
                fontSize: 11,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {open && (
          <>
            <nav id="site-drawer" aria-label="주요 메뉴" className="site-drawer shell-x">
              <NavList pathname={pathname} onNavigate={() => setOpen(false)} />
            </nav>
            <div aria-hidden className="site-drawer-backdrop" onClick={() => setOpen(false)} />
          </>
        )}
      </header>
    </>
  );
}
