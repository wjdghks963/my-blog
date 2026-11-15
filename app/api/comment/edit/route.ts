import { NextResponse } from "next/server";

import { authorizeComment } from "@libs/server/authorizeComment";
import prismaclient from "@libs/server/prismaClient";

const MAX_COMMENT_LENGTH = 2000;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const id = Number(body?.commentId);
  const content = typeof body?.content === "string" ? body.content.trim() : "";

  if (!content || content.length > MAX_COMMENT_LENGTH) {
    return NextResponse.json({ message: "Invalid content" }, { status: 400 });
  }

  try {
    const denied = await authorizeComment(id);
    if (denied) return denied;

    const comment = await prismaclient.comment.update({
      where: { id },
      data: { content },
      select: { id: true, content: true },
    });
    return NextResponse.json(comment);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update comment." }, { status: 500 });
  }
}
