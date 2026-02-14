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
  const { theme, setTheme } = useTheme();
  const [svgLoad, setSvgLoad] = useState<boolean>(true);

  useEffect(() => {
    setSvgLoad(false);

    // 브라우저 환경 체크
    if (typeof window === "undefined") return;

    if (localStorage.getItem("theme")) return;
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme:dark)").matches;

    setTheme(prefersDarkMode ? "dark" : "light");
  }, [setTheme]);

  return (
    <motion.li
      variants={variants}
      className={cls(
        className ?? "",
        "mx-auto mt-1 w-[190px]"
      )}
    >
      <button
        type="button"
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
        className="flex w-full items-center justify-between rounded-lg border border-soft bg-white px-3 py-2.5 transition-colors hover:bg-[#f3f7f5] dark:bg-[#13211f] dark:hover:bg-[#1a2d2a]"
      >
        <span className="text-sm font-semibold text-[var(--text-primary)]">Theme</span>
        {svgLoad ? (
          ""
        ) : theme === "dark" ? (
          <svg
            id="sun"
            className="h-5 w-5"
            fill="none"
            stroke="yellow"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
        ) : (
          <svg
            id="moon"
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
            ></path>
          </svg>
        )}
      </button>
    </motion.li>
  );
}
