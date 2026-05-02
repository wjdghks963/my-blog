"use client";

import { Category } from "@types";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

function CategoryBox({ category }: { category: Category }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-soft first:border-t-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 py-3 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-sm font-bold uppercase tracking-[0.18em]">
          {category.category}
        </span>
        <span className="flex items-center gap-3 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-muted tabular-nums">
          {category.posts.length}
          <span
            aria-hidden
            className={`inline-block transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            ↓
          </span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <ul className="space-y-0 pb-3">
              {category.posts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/blogs/post/${post.id}`}
                    className="flex items-center gap-3 py-1.5 text-sm text-ink-soft transition-colors hover:text-brand"
                  >
                    <span
                      aria-hidden
                      className="font-display text-xs text-muted"
                    >
                      ─
                    </span>
                    <span className="line-clamp-1">{post.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CategoryBox;
