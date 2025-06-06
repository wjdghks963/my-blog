"use client";

import { cls } from "@shared/utils/utils";
import { Cycle, motion } from "framer-motion";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const variants = {
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

export default function DarkModeBtn({ className, toggleOpen }: { className?: string; toggleOpen: Cycle }) {
  const { theme, setTheme } = useTheme();
  const [svgLoad, setSvgLoad] = useState<boolean>(true);

  useEffect(() => {
    setSvgLoad(false);
    if (localStorage.getItem("theme")) return;
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme:dark)").matches;

    setTheme(prefersDarkMode ? "dark" : "light");
  }, [setTheme]);

  return (
    <motion.li
      variants={variants}
      className={cls(
        className ?? "",
        "flex m-auto p-2.5 cursor-pointer group hover:bg-gray-400 hover:rounded-xl dark:hover:bg-blue-300 hover:shadow-md hover:shadow-slate-300 "
      )}
    >
      <div
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
          toggleOpen();
        }}
        className="m-auto text-gray-500 group-hover:animate-spin"
      >
        {svgLoad ? (
          ""
        ) : theme === "dark" ? (
          <svg
            id="sun"
            className="w-6 h-6"
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
            className="w-6 h-6 group-hover:text-white"
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
      </div>
    </motion.li>
  );
}
