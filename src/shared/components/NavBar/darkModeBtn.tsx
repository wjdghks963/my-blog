"use client";

import { cls } from "@shared/utils/utils";
import { motion, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const variants: Variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.5,
      opacity: { delay: 0.1 },
    },
  },
  closed: {
    x: -50,
    opacity: 0,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.5,
    },
  },
};

export default function DarkModeBtn({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const label = mounted ? (isDark ? "라이트 모드로 변경" : "다크 모드로 변경") : "테마 변경";

  return (
    <motion.li
      variants={variants}
      className={cls(className ?? "", "mx-auto mt-1 w-[190px]")}
    >
      <button
        type="button"
        onClick={() => setTheme(nextTheme)}
        aria-label={label}
        aria-pressed={isDark}
        className="flex w-full items-center justify-between rounded-lg border border-soft bg-white px-3 py-2.5 transition-colors hover:bg-[#f3f7f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:bg-[#13211f] dark:hover:bg-[#1a2d2a] dark:focus-visible:ring-offset-[#101b19]"
      >
        <span className="text-sm font-semibold text-[var(--text-primary)]">Theme</span>
        <span
          aria-hidden="true"
          className="flex h-5 w-5 items-center justify-center"
        >
          {!mounted ? (
            <span className="block h-5 w-5" />
          ) : isDark ? (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="#facc15"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5 text-[var(--text-primary)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </span>
      </button>
    </motion.li>
  );
}
