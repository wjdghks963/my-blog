"use client";

import Navigation from "@shared/components/NavBar/Navigation";
import MenuToggle from "@shared/components/NavBar/Toggle";
import useVisibleScrollY from "@shared/hooks/useVisibleScrollY";
import { cls } from "@shared/utils/utils";
import { motion, useCycle, Variants } from "framer-motion";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);
  const isVisible = useVisibleScrollY();

  // 스크롤 가시성 또는 호버 상태에 따라 표시
  const shouldShow = isVisible || isHovered || isOpen;

  return (
    <div
      className="fixed top-0 left-0 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebar}
        className={cls(shouldShow ? "block" : "hidden", "relative rounded-md")}
      >
        <motion.div
          className="absolute bg-white dark:bg-gray-800 w-[200px] h-[100vh] shadow-xl"
          variants={sidebar}
        />

        <MenuToggle toggle={() => toggleOpen()} />
        <Navigation
          isOpen={isOpen}
          toggleOpen={toggleOpen}
        />
      </motion.nav>

      {/* 숨겨진 상태에서도 호버 감지할 수 있는 작은 영역 */}
      {!shouldShow && (
        <div
          className="w-16 h-16 absolute top-0 left-0 bg-transparent"
          onMouseEnter={() => setIsHovered(true)}
        />
      )}
    </div>
  );
}
