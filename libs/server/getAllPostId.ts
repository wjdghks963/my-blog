import { NextResponse } from "next/server";

import prismaclient from "@libs/server/prismaClient";

export async function getAllPostId(): Promise<{ postsId: { id: number }[] }> {
  const postsId = await prismaclient.post.findMany({
    select: {
      id: true,
    },
  });
  return { postsId };
}
