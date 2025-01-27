import { NextResponse } from "next/server";

import prismaclient from "@libs/server/prismaClient";

async function deletePostAndTags(id: number) {
  // 1. 연결된 PostTag 삭제
  await prismaclient.postTag.deleteMany({
    where: { postId: id },
  });

  // 2. Post 삭제
  const deletedPost = await prismaclient.post.delete({
    where: { id },
    include: { tags: true }, // 삭제된 Post의 연결된 태그 정보 가져오기
  });

  const tags = deletedPost.tags;

  // 3. 태그 삭제
  await Promise.all(
    tags.map(async (tagData) => {
      // 태그가 다른 Post와도 연결되어 있는지 확인
      const tagPosts = await prismaclient.postTag.findMany({
        where: { tagId: tagData.tagId },
      });

      console.log(tagPosts);

      // 연결된 Post가 없으면 태그 삭제
      if (tagPosts.length === 0) {
        await prismaclient.tag.delete({ where: { id: tagData.tagId } });
      }
    })
  );
}

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    await deletePostAndTags(+id); // 숫자로 변환하여 전달
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error deleting post:", err);
    return NextResponse.json({ ok: false });
  }
}
