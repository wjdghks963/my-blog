import { PostPostJson } from "@types";
import { NextResponse } from "next/server";

import { findCategory } from "@libs/server/findCategoryId";
import { findTags } from "@libs/server/findTags";
import prismaclient from "@libs/server/prismaClient";

export async function POST(req: Request) {
  const { title, markdown, tags, description, category }: PostPostJson = await req.json();

  try {
    const tagsId = await findTags(tags!);
    const CategoryId = await findCategory(category ? category : "");

    await prismaclient.post.create({
      data: {
        title: title!,
        content: markdown!,
        views: 0,
        description,
        tags: {
          connect: tagsId?.map((itemId) => ({ id: itemId })),
        },
        category: category !== "" ? { connect: { id: CategoryId?.id } } : {},
      },
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json({ ok: false, message: `error occurred ${err}` });
  }
  return NextResponse.json({ ok: true });
}
