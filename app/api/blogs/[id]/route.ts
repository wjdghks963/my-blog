import { IPost, UserInfo } from "@types";
import { NextResponse } from "next/server";

import prismaclient from "@libs/server/prismaClient";

export interface Comment {
  id: number;
  user: UserInfo;
  content: string;
}

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  const params = pathname.split("/");
  const id = params[params.length - 1];

  try {
    const postId = +id!;

    const query = prismaclient.$queryRaw`
                SELECT
                  title,
                  content,
                  views,
                  description,
                  "createdAt" AS "createdAt",
                  "updatedAt" AS "updatedAt",
                  (
                    SELECT category
                    FROM "Category"
                    WHERE "Category".id = "Post"."categoryId"
                  ) AS "category",
                  (
                    SELECT json_agg(json_build_object(
                      'id', c.id,
                      'content', c.content,
                      'user', json_build_object(
                        'email', u.email,
                        'name', u.name,
                        'image', u.image
                      )
                    ))
                    FROM "Comment" c
                    JOIN "User" u ON c."userId" = u.id
                    WHERE c."postId" = "Post".id
                  ) AS comments,
                  (
                    SELECT json_agg(json_build_object(
                      'tagId', t.id,
                      'tag', t.tag
                    ))
                    FROM "Tag" t
                    JOIN "PostTag" pt ON t.id = pt."tagId"
                    WHERE pt."postId" = "Post".id
                  ) AS tags,
                  (
                    SELECT json_build_object('id', p.id, 'title', p.title, 'createdAt', p."createdAt")
                    FROM "Post" p
                    WHERE p."categoryId" = "Post"."categoryId"
                      AND (p."createdAt", p.id) < ("Post"."createdAt", "Post".id)
                    ORDER BY p."createdAt" DESC, p.id DESC
                    LIMIT 1
                  ) AS "prevPost",
                  (
                    SELECT json_build_object('id', p.id, 'title', p.title, 'createdAt', p."createdAt")
                    FROM "Post" p
                    WHERE p."categoryId" = "Post"."categoryId"
                      AND (p."createdAt", p.id) > ("Post"."createdAt", "Post".id)
                    ORDER BY p."createdAt" ASC, p.id ASC
                    LIMIT 1
                  ) AS "nextPost"
                FROM "Post"
                WHERE id = ${postId}
`;

    // @ts-ignore
    let postResult: [IPost] = await query;

    const post: IPost | undefined = postResult[0];

    if (!post) {
      return NextResponse.json({ ok: false, message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({
      title: post?.title,
      content: post?.content,
      views: post?.views,
      tags: post?.tags,
      comments: post?.comments,
      description: post?.description,
      category: post?.category,
      createdAt: post?.createdAt,
      updatedAt: post?.updatedAt,
      prevPost: post?.prevPost ?? null,
      nextPost: post?.nextPost ?? null,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: `error occurred ${err}` });
  }
}
