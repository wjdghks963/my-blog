"use client";

import Navigation from "@shared/components/NavBar/Navigation";
import MenuToggle from "@shared/components/NavBar/Toggle";
import useVisibleScrollY from "@shared/hooks/useVisibleScrollY";
import { cls } from "@shared/utils/utils";
import { motion, useCycle, Variants } from "framer-motion";

const sidebar: Variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};
export default function SlideHeaderNavBar() {
  const [isOpen, toggleOpen] = useCycle(false, true);

  const isVisible = useVisibleScrollY();

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebar}
      className={cls(isVisible ? "block" : "hidden", "fixed top-0 left-0 z-10 rounded-md")}
    >
      <motion.div
        className="absolute bg-white w-[200px] h-[100vh]"
        variants={sidebar}
      />

      <MenuToggle toggle={() => toggleOpen()} />
      <Navigation
        isOpen={isOpen}
        toggleOpen={toggleOpen}
      />
    </motion.nav>
  );
}
