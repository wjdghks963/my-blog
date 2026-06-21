import { PostWithId } from "@types";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import prismaclient from "@libs/server/prismaClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const rawTag = searchParams.get("tag");
  const rawQuery = searchParams.get("query");
  const rawPage = searchParams.get("page");
  const rawLimit = searchParams.get("limit");

  const tag = rawTag && rawTag !== "undefined" ? rawTag : "all";
  const query = rawQuery && rawQuery !== "undefined" ? rawQuery.trim() : "";
  const page = rawPage && rawPage !== "undefined" ? +rawPage : 1;
  const limit = rawLimit && rawLimit !== "undefined" ? +rawLimit : 5;

  const offset = (page - 1) * limit;
  const hasTag = tag !== "all" && tag !== "";
  const hasQuery = query !== "";

  // 검색어와 태그 조건을 조합해 동적으로 WHERE 절을 구성한다.
  const conditions: Prisma.Sql[] = [];

  if (hasQuery) {
    conditions.push(
      Prisma.sql`(p.title ILIKE ${`%${query}%`} OR p.content ILIKE ${`%${query}%`})`
    );
  }

  if (hasTag) {
    // 태그로 필터링하되 json_agg 결과에는 모든 태그가 그대로 노출되도록 EXISTS 사용.
    conditions.push(
      Prisma.sql`EXISTS (
        SELECT 1
        FROM "PostTag" pt2
        JOIN "Tag" t2 ON t2.id = pt2."tagId"
        WHERE pt2."postId" = p.id AND t2.tag = ${tag}
      )`
    );
  }

  const whereClause = conditions.length
    ? Prisma.sql`WHERE ${Prisma.join(conditions, " AND ")}`
    : Prisma.empty;

  const posts: PostWithId[] = await prismaclient.$queryRaw<PostWithId[]>`
      SELECT
            p.*,
            COALESCE(json_agg(json_build_object('tag', t.tag)) FILTER (WHERE t.tag IS NOT NULL), '[]'::json) AS tags
      FROM "Post" p
      LEFT JOIN "PostTag" pt ON p.id = pt."postId"
      LEFT JOIN "Tag" t ON t.id = pt."tagId"
      ${whereClause}
      GROUP BY p.id
      ORDER BY p."createdAt" DESC
      LIMIT ${limit} OFFSET ${offset};
  `;

  const hasNextPage = posts.length === limit;

  return NextResponse.json({ data: posts, hasNextPage });
}
