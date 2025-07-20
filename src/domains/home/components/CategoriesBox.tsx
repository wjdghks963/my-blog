import { Category } from "@types";
import React from "react";

import CategoriesBoxClient from "./CategoriesBoxClient";

//@ts-ignore
export default async function CategoriesBox(): any {
  const data: { categories: Category[] } = await fetchData();

  return <CategoriesBoxClient categories={data.categories} />;
}

async function fetchData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APIDOMAIN}/api/categories/posts`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error("Failed to fetch categories:", res.status, res.statusText);
    return { categories: [] }; // 빈 데이터를 반환
  }

  return await res.json();
}
