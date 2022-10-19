import type { NextApiRequest, NextApiResponse } from "next";
import prismaclient from "@libs/server/prismaClient";

type PagenationQuery = { tag?: string; limit?: string; cursor?: string };

export default async function Blogs(req: NextApiRequest, res: NextApiResponse) {
  const { tag, limit, cursor }: PagenationQuery = req.query;
  console.log(tag, "cursor", cursor);
  if (tag === "all") {
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

    const firstCursor =
      firstPost.length === 0 ? "done" : firstPost[firstPost.length - 1].id;

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

      const nextCursor =
        posts.length !== 0 && posts.length === +limit!
          ? posts[posts.length - 1].id
          : "done";

      return res.status(200).json({ data: posts, nextCursor });
    }

    return res.status(200).json({ data: firstPost, nextCursor: firstCursor });
  } else if (tag) {
    const firstPost = await prismaclient.post.findMany({
      take: limit ? +limit : 5,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        tags: { some: { tag } },
      },
      include: {
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });
    const firstCursor =
      firstPost.length !== 0 && firstPost.length === +limit!
        ? firstPost[firstPost.length - 1].id
        : "done";

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
        where: {
          tags: { some: { tag } },
        },
        include: {
          tags: {
            select: {
              tag: true,
            },
          },
        },
      });

      console.log("cusor", posts);

      const nextCursor =
        posts.length !== 0 && posts.length === +limit!
          ? posts[posts.length - 1].id
          : "done";

      return res.status(200).json({ data: posts, nextCursor });
    }

    return res.status(200).json({ data: firstPost, nextCursor: firstCursor });
  }
}
