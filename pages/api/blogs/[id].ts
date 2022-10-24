import prismaclient from "@libs/server/prismaClient";
import { Post, Tag } from "@prisma/client";

export interface IPost {
  title: string;
  content: string;
  views: number;
  tags: Tag[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export default async function BlogPostById(id: number) {
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
      },
    });

    return {
      ok: true,
      title: post?.title,
      content: post?.content,
      views: post?.views,
      tags: post?.tags,
      description: post?.description,
      createdAt: post?.createdAt,
      updatedAt: post?.updatedAt,
    };
  } catch (err) {
    console.log(err);
    return { ok: false, message: `error occurred ${err}` };
  }
}
