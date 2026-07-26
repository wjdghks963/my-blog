"use client";

import { categoryColor } from "@domains/home/utils/categoryColor";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

interface CategoryNavBarProps {
  categories: { category: string }[];
}

export default function CategoryNavBar({ categories }: CategoryNavBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("category") ?? "all";

  const selectCategory = useCallback(
    (category: string) => {
      // 카테고리를 바꿀 때는 검색어를 초기화하되, 태그 선택은 유지한다.
      const params = new URLSearchParams();
      const tag = searchParams.get("tag");
      if (tag && tag !== "all") {
        params.set("tag", tag);
      }
      if (category !== "all") {
        params.set("category", category);
      }
      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    },
    [searchParams, router, pathname]
  );

  return (
    <div className="flex flex-wrap gap-1.5">
      <CategoryChip name="all" label="전체" active={current === "all"} onSelect={selectCategory} />
      {categories.map((item) => (
        <CategoryChip
          key={item.category}
          name={item.category}
          label={item.category}
          active={current === item.category}
          onSelect={selectCategory}
        />
      ))}
    </div>
  );
}

function CategoryChip({
  name,
  label,
  active,
  onSelect,
}: {
  name: string;
  label: string;
  active: boolean;
  onSelect: (category: string) => void;
}) {
  const color = name === "all" ? "var(--ink)" : categoryColor(name);

  return (
    <button
      type="button"
      onClick={() => onSelect(name)}
      className="cursor-pointer rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors hover:bg-[var(--paper-2)]"
      style={{
        color: active ? color : "var(--ink-2)",
        borderColor: active ? color : "var(--rule)",
        fontWeight: active ? 600 : 400,
        background: "transparent",
      }}
    >
      {label}
    </button>
  );
}
