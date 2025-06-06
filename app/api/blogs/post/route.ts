import { Tag } from "@prisma/client";
import { PostPostJson } from "@types";
import { NextResponse } from "next/server";

import { checkOwner } from "@libs/server/checkOwner";
import prismaclient from "@libs/server/prismaClient";

export async function POST(req: Request) {
  const ownerCheck = await checkOwner();
  if (ownerCheck) return ownerCheck;

  const { title, markdown, description, tags, category }: PostPostJson = await req.json();

  let upsertedTags: Tag[] = [];
  let upsertedCategory = null;

  // tag upsert
  if (tags) {
    const validTags = tags.filter((tag) => tag.trim() !== ""); // 공백이 아닌 태그만 필터링
    for (const tag of validTags) {
      try {
        const upsertedTag = await prismaclient.tag.upsert({
          where: {
            tag: tag,
          },
          update: {},
          create: {
            tag: tag,
          },
        });

        upsertedTags.push(upsertedTag);
      } catch (e) {
        console.error("태그를 처리하는데 오류가 발생했습니다: ", e);
      }
    }
  }

  // category upsert
  if (category) {
    try {
      const uniqueCategory = await prismaclient.category.findUnique({
        where: { category: category[0] },
      });

      upsertedCategory = uniqueCategory;

      if (uniqueCategory === null) {
        let newCategory: { id: number; category: string }[] = await prismaclient.$queryRaw`
        INSERT INTO "Category" ("category")
        VALUES (${category})
        RETURNING *; 
        `;
        upsertedCategory = newCategory[0];
      }
    } catch (e) {
      console.error("카테고리를 처리하는데 오류가 발생했습니다: ", e);
    }
  }

  // 포스트 생성
  try {
    const postData: any = {
      title,
      content: markdown ?? "",
      views: 0,
      description,
    };

    if (upsertedCategory) {
      postData.category = {
        connect: { id: upsertedCategory.id },
      };
    }

    const createdPost = await prismaclient.post.create({
      // @ts-ignore
      data: postData,
    });

    // upsert한 태그들이 하나 이상이라면 중간 테이블 연결
    if (upsertedTags.length > 0) {
      await Promise.all(
        upsertedTags.map((tag) =>
          prismaclient.postTag.create({
            data: {
              postId: createdPost.id,
              tagId: tag.id,
            },
          })
        )
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ ok: false, error: "Error creating post" });
  }
}
