import prismaclient from "@libs/server/prismaclient";
import { Tag } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export interface IPost {
  title: string;
  content: string;
  tags: Tag[];
  views: number;
  createdAt: Date;
  updateAt: Date;
}

export default async function BlogPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;

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
          updateAt: true,
        },
      });

      return res.status(200).json({
        ok: true,
        title: post?.title,
        content: post?.content,
        views: post?.views,
        tags: post?.tags,
        createdAt: post?.createdAt,
        updateAt: post?.updateAt,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ ok: false, message: `error occurred ${err}` });
    }
  }

  if (req.method === "POST") {
  }
}
