import { NextResponse } from "next/server";

import { authorizeComment } from "@libs/server/authorizeComment";
import prismaclient from "@libs/server/prismaClient";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const id = Number(body?.id);

  try {
    const denied = await authorizeComment(id);
    if (denied) return denied;

    await prismaclient.comment.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete comment." }, { status: 500 });
  }
}
