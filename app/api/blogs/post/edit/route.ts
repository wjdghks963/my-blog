import { PostPostJson } from "@types";
import { NextResponse } from "next/server";

import { findCategory } from "@libs/server/findCategoryId";
import { findTags } from "@libs/server/findTags";
import prismaclient from "@libs/server/prismaClient";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") ? parseInt(searchParams.get("id") + "") : 1;

  const { title, markdown, tags, description, category }: PostPostJson = await req.json();

  try {
    const tagsId = tags ? await findTags(tags) : [];
    const CategoryId = category ? await findCategory(category) : undefined;

    await prismaclient.post.update({
      where: { id },
      data: {
        title,
        content: markdown,
        tags: {
          set: [], // Reset existing tags
          connect: tagsId?.map((tagId) => ({
            postId_tagId: { postId: id, tagId },
          })),
        },
        description,
        category: CategoryId
          ? {
              disconnect: true,
              connect: { id: CategoryId.id },
            }
          : {},
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: `Error occurred: ${err}` });
  }
}
