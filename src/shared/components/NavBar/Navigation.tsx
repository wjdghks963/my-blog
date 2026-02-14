"use client";

import ListItem from "@shared/components/NavBar/ListItem";
import DarkModeBtn from "@shared/components/NavBar/darkModeBtn";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const variants: Variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const ITEMS = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Blogs",
    href: "/blogs",
  },
  {
    text: "3D Space",
    href: "/3d-space",
  },
  {
    text: "About Me",
    href: "/about-me",
  },
  {
    text: "Update Note",
    href: "/update-note",
  },
  {
    text: "Your Profile",
    href: "/profile",
  },
];

export default function Navigation({
  isOpen,
  closeNav,
  toggleNav,
}: {
  isOpen: boolean;
  closeNav: () => void;
  toggleNav: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    ITEMS.forEach((item) => {
      router.prefetch(item.href);
    });
  }, [isOpen, router]);

  return (
    <motion.ul
      initial={false}
      variants={variants}
      animate={isOpen ? "open" : "closed"}
      className={`absolute left-4 top-[18px] z-30 flex flex-col gap-3 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <motion.li
        variants={{
          open: { x: 0, opacity: 1 },
          closed: { x: -30, opacity: 0 },
        }}
        className="w-[190px]"
      >
        <div className="flex items-center justify-between rounded-lg border border-soft bg-white px-3 py-2.5 dark:bg-[#13211f]">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Navigation</span>
          <button
            type="button"
            onClick={toggleNav}
            className="rounded-md border border-soft px-2 py-1 text-xs font-medium text-[var(--text-primary)] transition-colors hover:bg-[#f3f7f5] dark:hover:bg-[#1a2d2a]"
            aria-label="사이드바 닫기"
          >
            닫기
          </button>
        </div>
      </motion.li>

      {ITEMS.map((item, index) => (
        <ListItem
          key={index}
          text={item.text}
          href={item.href}
          onNavigate={closeNav}
        />
      ))}
      <DarkModeBtn />
    </motion.ul>
  );
}
