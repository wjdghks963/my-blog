import prismaclient from "@libs/server/prismaClient";
import { SSRData } from "pages";

type error = {
  ok: boolean;
  errormessage: unknown;
};

export default async function MainPosts(): Promise<SSRData | error> {
  try {
    const popularPosts = await prismaclient.post.findMany({
      take: 5,
      orderBy: {
        views: "desc",
      },
      include: {
        tags: true,
      },
    });

    const recentPosts = await prismaclient.post.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        tags: true,
      },
    });

    const categories = await prismaclient.category.findMany({
      orderBy: { category: "desc" },
      select: {
        category: true,
        posts: {
          select: {
            title: true,
            id: true,
          },
        },
      },
    });

    return { popularPosts, recentPosts, categories };
  } catch (err) {
    console.log(err);
    return { ok: false, errormessage: err };
  }
}
