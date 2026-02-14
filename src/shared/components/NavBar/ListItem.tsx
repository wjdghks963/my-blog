"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

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

export default function ListItem({
  text,
  href,
  onNavigate,
}: {
  text: string;
  href: string;
  onNavigate?: () => void;
}) {
  return (
    <motion.li
      variants={variants}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.95 }}
      className={"cursor-pointer w-[190px] px-3"}
    >
      <Link
        href={href}
        prefetch={true}
        className={
          "block w-full rounded-lg border border-soft bg-white px-3 py-2.5 transition-colors duration-200 hover:bg-[#f3f7f5] dark:bg-[#13211f] dark:hover:bg-[#1a2d2a]"
        }
        onClick={onNavigate}
      >
        <span className={"w-full text-sm font-roboto-bold text-[var(--text-primary)]"}>{text}</span>
      </Link>
    </motion.li>
  );
}
