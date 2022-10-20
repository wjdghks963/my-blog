import prismaclient from "@libs/server/prismaClient";
import { Tag } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export interface IPost {
  title: string;
  content: string;
  tags: Tag[];
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export default async function BlogPostById(id: number) {
  try {
    const post: IPost | undefined = await prismaclient.post.update({
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
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      ok: true,
      title: post?.title,
      content: post?.content,
      views: post?.views,
      tags: post?.tags,
      createdAt: post?.createdAt,
      updatedAt: post?.updatedAt,
    };
  } catch (err) {
    console.log(err);
    return { ok: false, message: `error occurred ${err}` };
  }
}
