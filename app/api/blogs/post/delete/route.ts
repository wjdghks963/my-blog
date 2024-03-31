import { NextResponse } from "next/server";

import prismaclient from "@libs/server/prismaClient";

async function deletePostAndTags(id: number) {
  const deletedPost = await prismaclient.post.delete({
    where: { id },
    include: { tags: true },
  });

  const tags = deletedPost.tags;

  await Promise.all(
    tags.map(async (tagData) => {
      const tagPosts = await prismaclient.tag.findUnique({ where: { id: tagData.tagId } }).posts();
      if (tagPosts?.length === 0) {
        await prismaclient.tag.delete({ where: { id: tagData.tagId } });
      }
    })
  );
}

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    await deletePostAndTags(+id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error deleting post:", err);
    return NextResponse.json({ ok: false });
  }
}
