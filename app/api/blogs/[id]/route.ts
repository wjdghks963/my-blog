import { Tag } from "@prisma/client";
import { UserInfo } from "@types";
import { NextRequest, NextResponse } from "next/server";

import prismaclient from "@libs/server/prismaClient";

export interface Comment {
  id: number;
  user: UserInfo;
  content: string;
}

export interface IPost {
  title: string;
  content: string;
  views: number;
  tags: Tag[];
  description: string;
  category: { category: string } | null;
  createdAt: Date;
  updatedAt: Date;
  comments: (Comment | null)[];
}

export async function GET(request: NextRequest) {
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
        tags: true,
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
