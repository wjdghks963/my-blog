import { PostPostJson } from "@types";
import { NextResponse } from "next/server";

import prismaclient from "@libs/server/prismaClient";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") ? parseInt(searchParams.get("id") + "") : 1;

  const { title, markdown, tags, description, category }: PostPostJson = await req.json();

  try {
    await prismaclient.$transaction(async (tx) => {
      // Update post detail
      await tx.$executeRaw`
        UPDATE "Post"
        SET 
          title = ${title},
          content = ${markdown},
          description = ${description}
        WHERE id = ${id}
      `;

      // 포스트에 엮이는 태그 처리
      if (tags && tags.length > 0) {
        const tagIds = await Promise.all(
          tags.map(async (tag) => {
            // 태그가 존재하는지 확인
            const [existingTag] = await tx.$queryRaw<{ id: number }[]>`
                SELECT id FROM "Tag" WHERE tag = ${tag}
            `;

            // 태그가 없으면 삽입
            if (!existingTag) {
              const [newTag] = await tx.$queryRaw<{ id: number }[]>`
                    INSERT INTO "Tag" ("tag") VALUES (${tag})
                    RETURNING id
              `;
              return newTag.id;
            }

            // 존재하는 경우 태그 ID 반환
            return existingTag.id;
          })
        );

        // 중간 테이블 삭제
        await tx.$executeRaw`
        DELETE FROM "PostTag"
        WHERE "postId" = ${id}
      `;

        // 태그 연결
        for (const tagId of tagIds.filter((t) => t)) {
          await tx.$executeRaw`
            INSERT INTO "PostTag" ("postId", "tagId")
            VALUES (${id}, ${tagId})
            ON CONFLICT DO NOTHING
          `;
        }
      }

      // Update category if provided
      if (category) {
        const [categoryId] = await tx.$queryRaw<{ id: number }[]>`
          SELECT id FROM "Category" WHERE name = ${category}
        `;

        if (categoryId) {
          await tx.$executeRaw`
            UPDATE "Post"
            SET "categoryId" = ${categoryId.id}
            WHERE id = ${id}
          `;
        }
      }
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: `Error occurred: ${err}` });
  }
}
