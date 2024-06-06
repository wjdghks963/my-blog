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
    const post: IPost = await prismaclient.post.update({
      data: {
        views: {
          increment: 1,
        },
      },
      where: {
        id: +id!,
      },
      select: {
        title: true,
        content: true,
        views: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            category: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            user: {
              select: {
                email: true,
                name: true,
                image: true,
              },
            },
          },
        },
        tags: {
          select: {
            tagId: true,
            tag: true,
          },
        },
      },
    });

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
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ ok: false, message: `error occurred ${err}` });
  }
}
