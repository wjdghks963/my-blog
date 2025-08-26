import { Category } from "@types";

import CategoriesBoxClient from "./CategoriesBoxClient";

export default async function CategoriesBox() {
  const data: { categories: Category[] } = await fetchData();

  return <CategoriesBoxClient categories={data.categories} />;
}

async function fetchData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APIDOMAIN || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/categories/posts`, { next: { tags: ["categories"] } });

    if (!res.ok) {
      return { categories: [] }; // 빈 데이터를 반환
    }

    return await res.json();
  } catch (error) {
    return { categories: [] };
  }
}
