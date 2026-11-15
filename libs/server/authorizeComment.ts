import { NextResponse } from "next/server";

import { getSessionEmail, isOwnerEmail } from "@libs/server/getSessionEmail";
import prismaclient from "@libs/server/prismaClient";

/**
 * 댓글 수정/삭제 권한 확인: 댓글 작성자 본인 또는 블로그 주인만 허용.
 * 허용되면 null, 아니면 응답을 돌려준다.
 */
export async function authorizeComment(commentId: number): Promise<NextResponse | null> {
  const email = await getSessionEmail();
  if (!email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!Number.isInteger(commentId) || commentId <= 0) {
    return NextResponse.json({ message: "Invalid comment id" }, { status: 400 });
  }

  const comment = await prismaclient.comment.findUnique({
    where: { id: commentId },
    select: { user: { select: { email: true } } },
  });

  if (!comment) {
    return NextResponse.json({ message: "Comment Not Found" }, { status: 404 });
  }

  if (comment.user.email !== email && !isOwnerEmail(email)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  return null;
}
