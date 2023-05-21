import prismaclient from "@libs/server/prismaClient";
import {NextResponse} from 'next/server'


export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)

  const tag = searchParams.get('tag') !== 'undefined' ? searchParams.get('tag')! +"" : "all";
  const query = searchParams.get('query') !== "undefined" ? searchParams.get('query')!+"" : "";
  const page = searchParams.get('page') !== "undefined" ? +searchParams.get('page')! : 1;
  const limit = searchParams.get('limit') !== "undefined" ? +searchParams.get('limit')! : 5;


  if (tag !== "all" && query === "") {
    const posts = await prismaclient.post.findMany({
      take: limit,
      skip:(page-1)*limit,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        tags: {some: {tag}},
      },
      include: {
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });

    const hasNextPage = posts.length === limit
    return NextResponse.json({data:posts, hasNextPage})
  }


  if (query !== "all" && tag === "") {
    const posts = await prismaclient.post.findMany({
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        title: {
          contains: query,
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

    const hasNextPage = posts.length === limit
    return NextResponse.json({data:posts,hasNextPage})
  }


  const allPosts = await prismaclient.post.findMany({
    take: limit,
    skip:(page-1)*limit,
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


  const hasNextPage = allPosts.length === limit

  return NextResponse.json({data:allPosts, hasNextPage})
}
