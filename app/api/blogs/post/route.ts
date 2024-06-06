import { PostPostJson } from "@types";
import { NextResponse } from "next/server";

import prismaclient from "@libs/server/prismaClient";

export async function POST(req: Request) {
  const { title, markdown, description, tags, category }: PostPostJson = await req.json();

  try {
    let tagPromises: Promise<any>[] = [];
    let categoryPromise: Promise<any> | null = null;

    if (tags && tags.length > 0) {
      tagPromises = tags.map((tag) =>
        prismaclient.tag.upsert({
          // @ts-ignore
          where: { tag },
          update: {},
          create: { tag },
        })
      );
    }

    if (category) {
      categoryPromise = prismaclient.category.upsert({
        // @ts-ignore
        where: { category },
        update: {},
        create: { category },
      });
    }

    const [createdTags, createdCategory] = await Promise.all([Promise.all(tagPromises), categoryPromise]);

    // 포스트 생성
    const postData: any = {
      title,
      markdown,
      views: 0,
      description,
    };

    if (createdTags.length > 0) {
      postData.tags = {
        connectOrCreate: createdTags.map((tag) => ({ where: { tag }, create: { tag } })),
      };
    }

    if (createdCategory) {
      postData.category = {
        connectOrCreate: { where: { category }, create: { category } },
      };
    }

    const createdPost = await prismaclient.post.create({
      data: postData,
    });

    return NextResponse.json({ ok: true, post: createdPost });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ ok: false, error: "Error creating post" });
  }
}
