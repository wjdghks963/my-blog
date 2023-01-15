import type { NextApiRequest, NextApiResponse } from "next";
import prismaclient from "@libs/server/prismaClient";

type SearchQuery = "" | string;
type Tag = "all" | string;

type PagenationQuery = {
  tag?: Tag;
  query?: SearchQuery;
  limit?: string;
  cursor?: string;
};

/**
 *
 * @param posts DB가 찾은 포스트들
 * @param limit uri query로 들어온 요청 -> 갯수 몇개?
 * @returns cursor가 끝인지 "done" 아니라면 뒤에 몇번째를 가져와야하나
 */
const getCursor = (posts: any, limit: number) => {
  return posts.length !== 0 && posts.length === limit!
    ? posts[posts.length - 1].id
    : "done";
};

export default async function Blogs(req: NextApiRequest, res: NextApiResponse) {
  const { tag, query, limit, cursor }: PagenationQuery = req.query;

  /**
   * tag가 전체이거나 query가 빈문자열일때 모든 포스트들을 보여줌
   * else if => tag가 all이 아니거나
   */
  if (tag === "all" || query === "") {
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

    const firstCursor = getCursor(firstPost, +limit!!);
    //firstPost.length === 0 ? "done" : firstPost[firstPost.length - 1].id;

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

      const nextCursor = getCursor(posts, +limit!!);

      return res.status(200).json({ data: posts, nextCursor });
    }

    return res.status(200).json({ data: firstPost, nextCursor: firstCursor });
  } else if (tag !== "all" && tag !== undefined) {
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
    const firstCursor = getCursor(firstPost, +limit!!);

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

      const nextCursor = getCursor(posts, +limit!!);

      return res.status(200).json({ data: posts, nextCursor });
    }

    return res.status(200).json({ data: firstPost, nextCursor: firstCursor });
  }

  if (query !== "" && query !== undefined) {
    const firstPost = await prismaclient.post.findMany({
      take: limit ? +limit : 5,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        title: {
          contains: String(query),
        },
      },
      include: {
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });
    console.log("first" + firstPost);

    const firstCursor = getCursor(firstPost, +limit!!);

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
          title: {
            contains: String(query),
          },
        },
        include: {
          tags: {
            select: {
              tag: true,
            },
          },
        },
      });

      const nextCursor = getCursor(posts, +limit!!);

      return res.status(200).json({ data: posts, nextCursor });
    }

    return res.status(200).json({ data: firstPost, nextCursor: firstCursor });
  }
}
