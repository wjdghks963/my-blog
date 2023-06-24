import { CommentPostJson } from "@types";
import { NextResponse } from "next/server";

import prismaclient from "@libs/server/prismaClient";

export async function POST(req: Request) {
  const { postId, userEmail, content }: CommentPostJson = await req.json();

  try {
    const comment = await prismaclient.comment.create({
      data: {
        content,
        user: { connect: { email: userEmail } },
        post: { connect: { id: +postId } },
      },
    });
    return NextResponse.json({ comment });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create comment." });
  }
}
