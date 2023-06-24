import { CommentEditJson } from "@types";
import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { NextResponse } from "next/server";

import prismaclient from "@libs/server/prismaClient";

export async function POST(req: Request) {
  const { commentId, content }: CommentEditJson = await req.json();
  try {
    const comment = await prismaclient.comment.update({
      where: { id: +commentId },
      data: { content },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update comment." });
  }
}
