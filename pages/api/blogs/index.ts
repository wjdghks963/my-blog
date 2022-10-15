import type { NextApiRequest, NextApiResponse } from "next";
import prismaclient from "@libs/server/prismaClient";

type PagenationQuery = { page?: string; limit?: string; cursor?: string };

export default async function Blogs(req: NextApiRequest, res: NextApiResponse) {
  const { page, limit, cursor }: PagenationQuery = req.query;

  const firstPost = await prismaclient.post.findMany({
    take: limit ? +limit : 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: {
        select: {
          tag: true,
        },
      },
    },
  });

  const firstCursor = firstPost[firstPost.length - 1].id;

  // const posts = await prismaclient.post.findMany({
  //   take: limit ? +limit : 5,
  //   skip: 1,
  //   cursor: {
  //     id: +firstCursor,
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  //   select: {
  //     tags: true,
  //   },
  // });
  // console.log(posts);

  if (cursor) {
    const posts = await prismaclient.post.findMany({
      take: limit ? +limit : 5,
      skip: 1,
      cursor: {
        id: +cursor,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });

    const nextCursor = posts.length !== 0 ? posts[posts.length - 1].id : "done";

    return res.status(200).json({ data: posts, nextCursor });
  }

  return res.status(200).json({ data: firstPost, nextCursor: firstCursor });
}
