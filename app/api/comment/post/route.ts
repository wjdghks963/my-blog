import { NextResponse } from "next/server";

import { getSessionEmail } from "@libs/server/getSessionEmail";
import prismaclient from "@libs/server/prismaClient";

const MAX_COMMENT_LENGTH = 2000;

export async function POST(req: Request) {
  // 작성자는 요청 본문이 아니라 서버 세션으로만 결정한다 (타인 사칭 방지)
  const email = await getSessionEmail();
  if (!email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const postId = Number(body?.postId);
  const content = typeof body?.content === "string" ? body.content.trim() : "";

  if (!Number.isInteger(postId) || postId <= 0 || !content || content.length > MAX_COMMENT_LENGTH) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  try {
    const comment = await prismaclient.comment.create({
      data: {
        content,
        user: { connect: { email } },
        post: { connect: { id: postId } },
      },
    });
    return NextResponse.json({ comment });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create comment." }, { status: 500 });
  }
}
