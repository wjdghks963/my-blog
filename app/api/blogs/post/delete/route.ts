import { NextResponse } from "next/server";

import { checkOwner } from "@libs/server/checkOwner";
import prismaclient from "@libs/server/prismaClient";

export async function POST(req: Request) {
  const ownerCheck = await checkOwner();
  if (ownerCheck) return ownerCheck;

  try {
    const { id: postId } = await req.json();
    const id = Number(postId);

    if (!id || isNaN(id)) {
      return NextResponse.json({ ok: false, error: "Invalid Post ID" }, { status: 400 });
    }

    await prismaclient.$transaction(async (tx) => {
      // 1. 게시물에 달린 댓글들 삭제
      await tx.comment.deleteMany({
        where: { postId: id },
      });

      // 2. 게시물과 태그의 연결(PostTag)을 끊고, 어떤 게시물과도 연결되지 않은 태그는 삭제
      const postTags = await tx.postTag.findMany({
        where: { postId: id },
        select: { tagId: true },
      });

      await tx.postTag.deleteMany({
        where: { postId: id },
      });

      const tagIds = postTags.map((pt) => pt.tagId);
      for (const tagId of tagIds) {
        const count = await tx.postTag.count({
          where: { tagId: tagId },
        });
        if (count === 0) {
          await tx.tag.delete({ where: { id: tagId } });
        }
      }

      // 3. 마지막으로 게시물 삭제 (Category와의 연결은 Prisma가 자동으로 처리)
      await tx.post.delete({
        where: { id },
      });
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error deleting post:", err);
    // Prisma의 RecordNotFound 에러를 명시적으로 처리
    if (err instanceof Error && "code" in err && (err as any).code === "P2025") {
      return NextResponse.json({ ok: false, error: "Post not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
