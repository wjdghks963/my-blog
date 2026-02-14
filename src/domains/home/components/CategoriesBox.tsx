import { Category } from "@types";

import prismaclient from "@libs/server/prismaClient";

import CategoriesBoxClient from "./CategoriesBoxClient";

export default async function CategoriesBox() {
  const data: { categories: Category[] } = await fetchData();

  return <CategoriesBoxClient categories={data.categories} />;
}

async function fetchData() {
  try {
    const categories = await prismaclient.category.findMany({
      orderBy: { category: "desc" },
      select: {
        category: true,
        posts: {
          select: {
            title: true,
            id: true,
          },
        },
      },
    });

    const sanitizedCategories: Category[] = categories.map((category) => ({
      ...category,
      posts: category.posts || [],
    }));

    return { categories: sanitizedCategories };
  } catch (error) {
    return { categories: [] };
  }
}
