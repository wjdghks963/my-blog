import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { NextResponse } from "next/server";

import prismaclient from "@libs/server/prismaClient";

export async function GET(_: Request) {
  try {
    const categories = await prismaclient.category.findMany({
      orderBy: { category: "desc" },
      select: {
        category: true,
        posts: {
          select: {
            title: true,
            id: true,
          },
        },
      },
    });

    const sanitizedCategories = categories.map((category) => ({
      ...category,
      posts: category.posts || [], // null 방지
    }));

    return NextResponse.json({ categories: sanitizedCategories });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error_message: err });
  }
}
