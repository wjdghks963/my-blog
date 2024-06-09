import { PostWithId } from "@types";
import { NextResponse } from "next/server";

import prismaclient from "@libs/server/prismaClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const tag = searchParams.get("tag") !== "undefined" ? searchParams.get("tag")! + "" : "all";
  const query = searchParams.get("query") !== "undefined" ? searchParams.get("query")! + "" : "";
  const page = searchParams.get("page") !== "undefined" ? +searchParams.get("page")! : 1;
  const limit = searchParams.get("limit") !== "undefined" ? +searchParams.get("limit")! : 5;

  if (tag !== "all" && query === "") {
    const posts: PostWithId[] = await prismaclient.$queryRaw<PostWithId[]>`
      SELECT 
            p.*, 
            COALESCE(json_agg(json_build_object('tag', t.tag)) FILTER (WHERE t.tag IS NOT NULL), '[]'::json) AS tags
      FROM 
            "Post"  p
      LEFT JOIN 
            "PostTag" pt ON p.id = pt."postId"
      LEFT JOIN 
            "Tag" t ON t.id = pt."tagId"
      WHERE 
            t.tag = ${tag}
      GROUP BY p.id
      ORDER BY p."createdAt" DESC
      LIMIT ${limit} OFFSET ${(page - 1) * limit};
`;

    const hasNextPage = posts.length === limit;
    return NextResponse.json({ data: posts, hasNextPage });
  }

  // 제목과 내용 중에 맞는 것이 있다면 전부 나오게 함
  if (query !== "all" && tag === "") {
    const posts: PostWithId[] = await prismaclient.$queryRaw<PostWithId[]>`
    SELECT 
        p.*, 
        COALESCE(json_agg(json_build_object('tag', t.tag)) FILTER (WHERE t.tag IS NOT NULL), '[]'::json) AS tags
    FROM 
        "Post" p
    LEFT JOIN 
        "PostTag" AS pt ON p.id = pt."postId"
    LEFT JOIN 
        "Tag" AS t ON t.id = pt."tagId"
    WHERE 
        p.title ILIKE ${`%${query}%`} OR p.content ILIKE ${`%${query}%`}
    GROUP BY p.id
    ORDER BY p."createdAt" DESC
    LIMIT ${limit} OFFSET ${(page - 1) * limit};
    `;

    const hasNextPage = posts.length === limit;
    return NextResponse.json({ data: posts, hasNextPage });
  }

  const allPosts: PostWithId[] = await prismaclient.$queryRaw<PostWithId[]>`
      SELECT p.*, COALESCE(json_agg(json_build_object('tag', t.tag)) FILTER (WHERE t.tag IS NOT NULL), '[]'::json) AS tags
      FROM "Post" p
      LEFT JOIN "PostTag" pt ON p.id = pt."postId"
      LEFT JOIN "Tag" t ON t.id = pt."tagId"
      GROUP BY p.id
      ORDER BY p."createdAt" DESC
      LIMIT ${limit} OFFSET ${(page - 1) * limit};
`;

  const hasNextPage = allPosts.length === limit;

  return NextResponse.json({ data: allPosts, hasNextPage });
}
