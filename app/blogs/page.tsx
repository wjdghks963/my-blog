import PostListPage from "@domains/post/pages/post-list.page";

import prismaclient from "@libs/server/prismaClient";

export const revalidate = 60;

export default async function BlogsPage() {
  const tags = await prismaclient.tag.findMany({
    select: {
      tag: true,
    },
  });

  const categories = await prismaclient.category.findMany({
    select: {
      category: true,
    },
    orderBy: {
      category: "asc",
    },
  });

  return <PostListPage tags={tags} categories={categories} />;
}
