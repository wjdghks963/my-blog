import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import prismaclient from "@libs/server/prismaClient";

export async function POST(request: Request) {
  const { pathname } = new URL(request.url);
  const params = pathname.split("/");
  // .../api/blogs/[id]/views -> [..., id, "views"]
  const id = params[params.length - 2];

  try {
    const postId = +id!;

    if (!postId || isNaN(postId)) {
      return NextResponse.json({ ok: false, message: "Invalid Post ID" }, { status: 400 });
    }

    await prismaclient.post.update({
      where: { id: postId },
      data: { views: { increment: 1 } },
    });

    // increase views affects stats
    revalidateTag("stats");

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    if (err instanceof Error && "code" in err && (err as any).code === "P2025") {
      return NextResponse.json({ ok: false, message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: false, message: `error occurred ${err}` }, { status: 500 });
  }
}
