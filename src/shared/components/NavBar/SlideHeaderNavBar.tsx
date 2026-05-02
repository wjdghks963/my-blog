"use client";

import DarkModeBtn from "@shared/components/NavBar/darkModeBtn";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ITEMS = [
  { text: "Index", href: "/" },
  { text: "Writing", href: "/blogs" },
  { text: "About", href: "/about-me" },
  { text: "Notes", href: "/update-note" },
  { text: "3D", href: "/3d-space" },
];

export default function SlideHeaderNavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b-[1.5px] border-ink bg-paper">
        {/* Tape strip */}
        <div className="border-b border-soft bg-ink text-paper">
          <div className="overflow-hidden whitespace-nowrap py-1.5">
            <div className="flex w-max animate-marquee gap-12 font-display text-[10px] font-bold uppercase tracking-[0.4em]">
              {Array.from({ length: 2 }).map((_, blockIdx) => (
                <div
                  key={blockIdx}
                  className="flex shrink-0 gap-12"
                >
                  {[
                    "JUNGLOG",
                    "VOL.04",
                    "WEB ENGINEERING JOURNAL",
                    "EST. 2022",
                    "FRONT / INFRA / NOTES",
                    "/",
                    "BUILD · MEASURE · IMPROVE",
                  ].map((label) => (
                    <span
                      key={`${blockIdx}-${label}`}
                      className="shrink-0"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="page-shell">
          <div className="flex h-16 items-center justify-between gap-6">
            <Link
              href="/"
              className="flex items-baseline gap-2"
              aria-label="Junglog 홈으로"
            >
              <span className="font-display text-2xl font-bold tracking-[-0.04em]">JUNGLOG.</span>
              <span className="hidden font-display text-[10px] font-bold uppercase tracking-[0.32em] text-muted mobile:inline">
                / a tech journal
              </span>
            </Link>

            <nav
              aria-label="Primary"
              className="hidden items-center gap-7 lg:flex"
            >
              {ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.text}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <DarkModeBtn />
              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="inline-flex h-10 w-10 items-center justify-center border-[1.5px] border-ink lg:hidden"
                aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
                aria-expanded={open}
              >
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <motion.path
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="square"
                    initial={false}
                    animate={open ? { d: "M 1 1 L 17 13" } : { d: "M 1 1 L 17 1" }}
                    transition={{ duration: 0.18 }}
                  />
                  <motion.path
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="square"
                    d="M 1 7 L 17 7"
                    initial={false}
                    animate={open ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.12 }}
                  />
                  <motion.path
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="square"
                    initial={false}
                    animate={open ? { d: "M 1 13 L 17 1" } : { d: "M 1 13 L 17 13" }}
                    transition={{ duration: 0.18 }}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden border-t border-soft bg-paper lg:hidden"
            >
              <nav
                aria-label="Mobile"
                className="page-shell flex flex-col gap-1 py-4"
              >
                {ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between border-b border-soft py-3 font-display text-sm font-bold uppercase tracking-[0.22em]"
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    <span>{item.text}</span>
                    <span className="text-muted">→</span>
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
