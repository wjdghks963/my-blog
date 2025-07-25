import { PostStatus } from "@types";
import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { NextResponse } from "next/server";

import { RegImageSrc } from "@libs/server/RegImageSrc";
import prismaclient from "@libs/server/prismaClient";

interface Params {
  status: PostStatus;
}

export async function GET(_: Request, context: { params: Promise<Params> }) {
  const { status } = await context.params;

  switch (status) {
    case "popular": {
      try {
        const popularPosts = await prismaclient.post.findMany({
          take: 5,
          orderBy: {
            views: "desc",
          },
          select: {
            id: true,
            title: true,
            description: true,
            content: true,
            views: true,
          },
        });

        const popularPostsJson = popularPosts.map((post) => {
          const thumbnailFromContent = RegImageSrc(post.content);
          return {
            id: post.id,
            title: post.title,
            description: post.description,
            thumbnail: thumbnailFromContent ? thumbnailFromContent : null,
            views: post.views,
          };
        });

        return NextResponse.json({ json: popularPostsJson });
      } catch (e) {
        return NextResponse.json({ err: e });
      }
    }

    case "recent": {
      try {
        const recentPosts = await prismaclient.post.findMany({
          take: 5,
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            title: true,
            description: true,
            content: true,
            views: true,
          },
        });

        const recentPostsJson = recentPosts.map((post) => {
          const thumbnailFromContent = RegImageSrc(post.content);

          return {
            id: post.id,
            title: post.title,
            description: post.description,
            thumbnail: thumbnailFromContent ? thumbnailFromContent : null,
            views: post.views,
          };
        });

        return NextResponse.json({ json: recentPostsJson });
      } catch (e) {
        return NextResponse.json({ err: e });
      }
    }
    default: {
      return NextResponse.json({ err: "NOT FOUND" });
    }
  }
}
