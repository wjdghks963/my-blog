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
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: isDark ? "var(--ink)" : "var(--ink)",
          display: "inline-block",
        }}
      />
      {mounted ? (isDark ? "Dark" : "Light") : "Theme"}
    </button>
  );
}

export default function ChromeBar() {
  const pathname = usePathname() ?? "/";

  return (
    <header
      className="px-6 mobile:px-14"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--paper)",
        borderBottom: "1px solid var(--rule)",
        height: 64,
      }}
    >
      <div className="flex h-full items-center justify-between gap-4">
        <Link
          href="/"
          className="font-serif"
          style={{
            fontSize: 19,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          Junglog<span style={{ color: "var(--accent)" }}>.</span>
          <span
            className="tiny-label hidden mobile:inline"
            style={{ marginLeft: 12, color: "var(--ink-3)", fontWeight: 500 }}
          >
            est. 2024
          </span>
        </Link>

        <nav
          className="hidden items-center gap-5 mobile:flex"
          style={{ fontSize: 13, color: "var(--ink-3)" }}
        >
          {LINKS.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  color: active ? "var(--ink)" : "var(--ink-3)",
                  fontWeight: active ? 600 : 400,
                  borderBottom: active ? "1.5px solid var(--accent)" : "1.5px solid transparent",
                  paddingBottom: 2,
                }}
              >
                {l.text}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="hidden mobile:inline-block"
            style={{ width: 1, height: 14, background: "var(--rule)" }}
          />
          <ModeChip />
        </div>
      </div>
    </header>
  );
}
