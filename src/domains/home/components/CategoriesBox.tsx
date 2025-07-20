import { Category } from "@types";
import React from "react";

import CategoryBox from "./CategoryBox";

//@ts-ignore
export default async function CategoriesBox(): any {
  const data: { categories: Category[] } = await fetchData();
  return (
    <div className="flex flex-row gap-5 overflow-x-scroll scrollbar-hide overflow-clip">
      {data.categories.map((category, index) => (
        <CategoryBox
          key={index}
          category={category}
        />
      ))}
    </div>
  );
}

async function fetchData() {
  const res = await fetch(`/api/categories/posts`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error("Failed to fetch categories:", res.status, res.statusText);
    return { categories: [] }; // 빈 데이터를 반환
  }

  return await res.json();
}
