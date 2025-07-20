"use client";

import { motion, Variants } from "framer-motion";

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

export default function ListItem({ text, fn }: { text: string; fn: any }) {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={"cursor-pointer w-[150px] p-3"}
    >
      <div
        className={"w-full"}
        onClick={() => fn()}
      >
        <span className={"w-full text-center text-black font-roboto-bold"}>{text}</span>
      </div>
    </motion.li>
  );
}
