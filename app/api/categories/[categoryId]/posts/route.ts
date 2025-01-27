import { NextResponse } from "next/server";

import prismaclient from "@libs/server/prismaClient";

export async function GET(req: Request, { params }: { params: { categoryId: string } }) {
  const { categoryId } = params;

  try {
    const categoryWithPosts = await prismaclient.category.findUnique({
      where: { id: parseInt(categoryId) },
      select: {
        category: true,
        posts: {
          select: {
            id: true,
            title: true,
            content: true,
          },
        },
      },
    });

    if (!categoryWithPosts) {
      return NextResponse.json({ ok: false, error_message: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ category: categoryWithPosts });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error_message: err });
  }
}
