"use client";

import { motion } from "framer-motion";

import useVisibleScrollY from "@libs/client/useVisibleScrollY";
import { cls } from "@libs/client/utils";

enum HeaderLevel {
  H1 = 1,
  H2 = 2,
  H3 = 3,
}

const createTableOfContents = (markdown: string) => {
  const regex = /(#+)\s+(.*)/g;
  let match;
  const tableOfContents = [];
  while ((match = regex.exec(markdown)) !== null) {
    const level = match[1].length;
    const title = match[2];
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

  const scrollTo = (headerId: string) => {
    const header = document.getElementById(headerId);
    header?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, header?.title + "", `#${headerId}`);
    return;
  };

  const isVisible = useVisibleScrollY();

  const fontByLevel = (level: number): string => {
    switch (level) {
      case HeaderLevel.H1: {
        return "font-bold text-lg";
      }
      case HeaderLevel.H2: {
        return "font-semibold text-base";
      }
      case HeaderLevel.H3: {
        return "font-medium text-sm";
      }
      default: {
        return "font-normal text-sm";
      }
    }
  };

  const tableVariants = {
    hidden: {
      opacity: 0,
      x: "100%",
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={tableVariants}
      layout
      transition={spring}
      className={cls(
        isVisible ? "mobile:block" : "",
        `fixed right-0 top-32 min-w-md hidden bg-white p-4 space-y-4 rounded-sm border-2 border-gray-200 shadow-sm shadow-slate-300`
      )}
    >
      <h2 className="text-xl text-black ">Table of Contents</h2>
      <ul>
        {toc.map((item, index) => (
          <motion.li
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            key={index}
            className={"cursor-pointer text-black"}
          >
            <a
              className={`${fontByLevel(item.level)}`}
              onClick={(e) => {
                scrollTo(item.anchor);
              }}
            >
              {item.title}
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};
