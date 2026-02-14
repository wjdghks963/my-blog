"use client";

import Navigation from "@shared/components/NavBar/Navigation";
import MenuToggle from "@shared/components/NavBar/Toggle";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

const panel: Variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.2,
    },
  },
  closed: {
    x: -240,
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.2,
    },
  },
};

export default function SlideHeaderNavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed left-0 top-0 z-50">
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="relative"
      >
        <div className="absolute left-0 top-0 z-50">
          <MenuToggle toggle={() => setIsOpen((prev) => !prev)} />
        </div>
        <motion.div
          className="absolute left-0 top-0 z-20 h-[100vh] w-[220px] border-r border-[#c8d3ce] bg-[#f2f6f4] shadow-xl dark:border-[#2b403c] dark:bg-[#101b19]"
          variants={panel}
        />
        <Navigation
          isOpen={isOpen}
          closeNav={() => setIsOpen(false)}
          toggleNav={() => setIsOpen((prev) => !prev)}
        />
      </motion.nav>
    </div>
  );
}
