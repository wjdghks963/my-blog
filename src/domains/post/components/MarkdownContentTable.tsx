"use client";

import useVisibleScrollY from "@shared/hooks/useVisibleScrollY";
import { cls } from "@shared/utils/utils";
import { motion, Variants } from "framer-motion";

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
      case HeaderLevel.H1:
        return "font-bold text-lg text-indigo-600";
      case HeaderLevel.H2:
        return "font-semibold text-base text-indigo-500";
      case HeaderLevel.H3:
        return "font-medium text-sm text-indigo-400";
      default:
        return "font-normal text-sm text-indigo-300";
    }
  };

  const tableVariants: Variants = {
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
        `fixed right-6 top-32 min-w-xs hidden bg-white p-6 rounded-lg shadow-lg border border-gray-200`
      )}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {toc.map((item, index) => (
          <motion.li
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            key={index}
            className="cursor-pointer text-gray-800 hover:text-blue-600"
          >
            <a
              className={`${fontByLevel(item.level)} block pl-${item.level * 4} truncate text-gray-800`}
              onClick={() => scrollTo(item.anchor)}
              style={{
                borderLeft: `4px solid ${item.level === 1 ? "#6366F1" : item.level === 2 ? "#3B82F6" : "#60A5FA"}`,
                paddingLeft: "8px",
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
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
};
