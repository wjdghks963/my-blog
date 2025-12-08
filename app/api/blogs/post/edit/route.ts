import { PostPostJson } from "@types";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { checkOwner } from "@libs/server/checkOwner";
import prismaclient from "@libs/server/prismaClient";

export async function POST(req: Request) {
  const ownerCheck = await checkOwner();
  if (ownerCheck) return ownerCheck;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") ? parseInt(searchParams.get("id") + "") : 1;
    const { title, markdown, tags, description, category }: PostPostJson = await req.json();

    await prismaclient.$transaction(async (tx) => {
      // 게시글 업데이트
      await tx.$executeRaw`
        UPDATE "Post"
        SET 
          title = ${title},
          content = ${markdown},
          description = ${description}
        WHERE id = ${id}
      `;

      // 태그 처리
      if (tags && tags.length > 0) {
        const tagIds = await Promise.all(
          tags.map(async (tag) => {
            // 태그 존재 여부 확인
            const [existingTag] = await tx.$queryRaw<{ id: number }[]>`
                SELECT id FROM "Tag" WHERE tag = ${tag}
            `;

            if (!existingTag) {
              // 새 태그 삽입
              const [newTag] = await tx.$queryRaw<{ id: number }[]>`
                    INSERT INTO "Tag" ("tag") VALUES (${tag})
                    RETURNING id
              `;
              return newTag.id;
            }

            return existingTag.id;
          })
        );

        // 기존 태그 삭제
        await tx.$executeRaw`
        DELETE FROM "PostTag"
        WHERE "postId" = ${id}
      `;

        // 새로운 태그 연결
        for (const tagId of tagIds.filter((t) => t)) {
          await tx.$executeRaw`
            INSERT INTO "PostTag" ("postId", "tagId")
            VALUES (${id}, ${tagId})
            ON CONFLICT DO NOTHING
          `;
        }
      }

      // 카테고리 업데이트
      if (category && Array.isArray(category) && category.length > 0) {
        const mainCategory = category[0]; // 배열의 첫 번째 카테고리만 사용
        const [existingCategory] = await tx.$queryRaw<{ id: number }[]>`
            SELECT id FROM "Category" WHERE category = ${mainCategory}
        `;

        let categoryIdToLink: number | null = null;
        if (existingCategory) {
          categoryIdToLink = existingCategory.id;
        } else {
          // 카테고리가 없으면 새로 생성
          const [newCategory] = await tx.$queryRaw<{ id: number }[]>`
                INSERT INTO "Category" (category) VALUES (${mainCategory})
                RETURNING id
            `;
          categoryIdToLink = newCategory.id;
        }

        await tx.$executeRaw`
            UPDATE "Post"
            SET "categoryId" = ${categoryIdToLink}
            WHERE id = ${id}
        `;
      } else {
        // 카테고리가 제공되지 않았거나 빈 배열인 경우, 연결을 해제
        await tx.$executeRaw`
            UPDATE "Post"
            SET "categoryId" = NULL
            WHERE id = ${id}
        `;
      }
    });

    revalidateTag("posts");
    revalidateTag("tags");
    revalidateTag("categories");
    revalidateTag("stats");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: `Error occurred: ${err}` }, { status: 500 });
  }
}
