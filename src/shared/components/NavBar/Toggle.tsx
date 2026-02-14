"use client";

import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

export default function MenuToggle({ toggle }: { toggle: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <button
      onClick={toggle}
      className="rounded-full border border-soft bg-white p-2 text-[var(--text-primary)] shadow-sm transition-colors hover:bg-[#f3f7f5] dark:bg-[#13211f] dark:hover:bg-[#1a2d2a]"
      aria-label="메뉴 열기 또는 닫기"
    >
      <svg
        width="23"
        height="23"
        viewBox="0 0 23 23"
      >
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </button>
  );
}
