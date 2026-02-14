"use client";

import { cls } from "@shared/utils/utils";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

enum HeaderLevel {
  H1 = 1,
  H2 = 2,
  H3 = 3,
}

const CODE_BLOCK_PATTERN = /```[\s\S]*?```/g;

const stripCodeBlocks = (markdown: string) => markdown.replace(CODE_BLOCK_PATTERN, "");

const createTableOfContents = (markdown: string) => {
  const source = stripCodeBlocks(markdown);
  const regex = /^\s*(#{1,3})\s*(.+)$/gm;
  let match;
  const tableOfContents = [];

  while ((match = regex.exec(source)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const anchor = title
      .replace(/\.\s+/g, "-")
      .replace(/[^a-zA-Z0-9가-힣\s-]/g, "")
      .replace(/ /g, "-")
      .toLowerCase();

    tableOfContents.push({ level, anchor, title });
  }

  return tableOfContents;
};

export default function TableOfContents({ markdown }: { markdown: string }) {
  const toc = createTableOfContents(markdown);
  const [isVisible, setIsVisible] = useState(true);

  const scrollTo = (headerId: string) => {
    const header = document.getElementById(headerId);
    header?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, header?.title + "", `#${headerId}`);
  };

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - prevScrollY;

      if (currentScrollY <= 120) {
        setIsVisible(true);
        prevScrollY = currentScrollY;
        return;
      }

      if (delta > 0) {
        // 아래로 스크롤할 때는 TOC를 숨김
        setIsVisible(false);
      } else if (delta < 0) {
        // 위로 스크롤하면 즉시 표시
        setIsVisible(true);
      }

      prevScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fontByLevel = (level: number): string => {
    switch (level) {
      case HeaderLevel.H1:
        return "text-sm font-semibold";
      case HeaderLevel.H2:
        return "text-sm font-medium opacity-90";
      case HeaderLevel.H3:
        return "text-xs font-medium opacity-80";
      default:
        return "text-xs opacity-75";
    }
  };

  const tableVariants: Variants = {
    hidden: {
      opacity: 0,
      x: 24,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.22, ease: "easeOut" },
    },
  };

  if (!toc.length) {
    return null;
  }

  return (
    <>
      <motion.aside
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={tableVariants}
        layout
        transition={spring}
        className={cls(
          "fixed right-6 top-28 z-[80] hidden w-[280px] max-h-[calc(100vh-8rem)] overflow-y-auto rounded-xl border border-soft bg-[var(--bg-elevated)] p-4 shadow-xl backdrop-blur lg:block",
          isVisible ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <h2 className="mb-3 text-lg font-bold text-[var(--text-primary)]">On this page</h2>
        <ul className="space-y-1.5">
          {toc.map((item, index) => (
            <motion.li
              whileHover={{ x: 2 }}
              transition={{ duration: 0.15 }}
              key={index}
              className="cursor-pointer text-[var(--text-primary)]"
            >
              <button
                className={`${fontByLevel(item.level)} block w-full truncate rounded px-2 py-1 text-left hover:bg-white/60 dark:hover:bg-white/10`}
                onClick={() => scrollTo(item.anchor)}
                style={{ paddingLeft: `${item.level * 10}px` }}
                type="button"
              >
                {item.title}
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.aside>

      {!isVisible && (
        <button
          type="button"
          onClick={() => setIsVisible(true)}
          className="fixed right-5 top-1/2 z-[79] hidden -translate-y-1/2 rounded-full border border-soft bg-[var(--bg-elevated)] px-3 py-2 text-xs font-semibold text-[var(--text-primary)] shadow-lg backdrop-blur transition-colors hover:bg-[var(--bg-soft)] lg:block"
          aria-label="On this page 열기"
        >
          TOC
        </button>
      )}
    </>
  );
}

const spring = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
};
