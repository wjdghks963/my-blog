"use client";

import ListItem from "@shared/components/NavBar/ListItem";
import DarkModeBtn from "@shared/components/NavBar/darkModeBtn";
import { Cycle, motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";

const variants: Variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};
export default function Navigation({ isOpen, toggleOpen }: { isOpen: boolean; toggleOpen: Cycle }) {
  const router = useRouter();
  const Items = [
    {
      text: "HOME",
      fn: () => {
        router.push("/");
        toggleOpen();
      },
    },
    {
      text: "BLOGS",
      fn: () => {
        router.push("/blogs");
        toggleOpen();
      },
    },
    {
      text: "3D SPACE",
      fn: () => {
        router.push("/3d-space");
        toggleOpen();
      },
    },
    {
      text: "About Me",
      fn: () => {
        router.push("/about-me");
        toggleOpen();
      },
    },
    {
      text: "Update Note",
      fn: () => {
        router.push("/update-note");
        toggleOpen();
      },
    },
    {
      text: "Your Profile",
      fn: () => {
        router.push("/profile");
        toggleOpen();
      },
    },
  ];

  return (
    <motion.ul
      initial={false}
      variants={variants}
      animate={isOpen ? "open" : "closed"}
      className={"absolute top-[70px] flex flex-col  gap-8"}
    >
      {Items.map((item, index) => (
        <ListItem
          key={index}
          text={item.text}
          fn={item.fn}
        />
      ))}
      <DarkModeBtn toggleOpen={toggleOpen} />
    </motion.ul>
  );
}
