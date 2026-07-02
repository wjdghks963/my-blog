import PostListPage from "@domains/post/pages/post-list.page";

import prismaclient from "@libs/server/prismaClient";

export const revalidate = 60;

export default async function BlogsPage() {
  const tags = await prismaclient.tag.findMany({
    select: {
      tag: true,
    },
  });

  return <PostListPage tags={tags} />;
}
