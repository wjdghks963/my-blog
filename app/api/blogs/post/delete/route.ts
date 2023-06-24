import { NextResponse } from "next/server";

import prismaclient from "@libs/server/prismaClient";

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    const deletePostTags = await prismaclient.post.delete({
      where: {
        id: +id,
      },
      select: {
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });

    const tags = deletePostTags.tags.map((tag) => tag.tag);

    const tagsPosts = await prismaclient.tag.findMany({
      where: {
        tag: { in: tags },
      },
      include: { _count: true },
    });

    tagsPosts.map(async (post) => {
      if (+post._count.posts === 0) {
        await prismaclient.tag.delete({
          where: { id: post.id },
        });
      }
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ ok: false });
  }
}
