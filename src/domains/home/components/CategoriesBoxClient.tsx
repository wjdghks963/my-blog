"use client";

import { Category } from "@types";
import React, { useState } from "react";

import CategoryBox from "./CategoryBox";

interface CategoriesBoxClientProps {
  categories: Category[];
}

export default function CategoriesBoxClient({ categories }: CategoriesBoxClientProps) {
  const [showAll, setShowAll] = useState(false);
  const displayLimit = 6;
  const displayCategories = showAll ? categories : categories.slice(0, displayLimit);
  const hasMore = categories.length > displayLimit;

  if (!categories || categories.length === 0) {
    return (
      <div className="py-6 font-display text-sm text-muted">No topics yet.</div>
    );
  }

  return (
    <div>
      <div className="border-b border-soft">
        {displayCategories.map((category, index) => (
          <CategoryBox
            key={index}
            category={category}
          />
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 inline-flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.24em] underline underline-offset-[6px] decoration-[1.5px]"
          type="button"
        >
          {showAll ? "Collapse" : `Show ${categories.length - displayLimit} more`}
          <span aria-hidden>{showAll ? "↑" : "↓"}</span>
        </button>
      )}
    </div>
  );
}
