"use client";

import { Category } from "@types";
import React, { useState } from "react";

import CategoryBox from "./CategoryBox";

interface CategoriesBoxClientProps {
  categories: Category[];
}

export default function CategoriesBoxClient({ categories }: CategoriesBoxClientProps) {
  const [showAll, setShowAll] = useState(false);
  const displayLimit = 4;
  const displayCategories = showAll ? categories : categories.slice(0, displayLimit);
  const hasMore = categories.length > displayLimit;

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
        <div className="text-sm">카테고리가 없습니다</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {displayCategories.map((category, index) => (
        <CategoryBox
          key={index}
          category={category}
        />
      ))}

      {hasMore && (
        <div className="text-center pt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/20 dark:hover:bg-gray-900/30 transition-all duration-300"
          >
            <span>{showAll ? "접기" : `+${categories.length - displayLimit}개 더 보기`}</span>
            <svg
              className={`w-4 h-4 transform transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
