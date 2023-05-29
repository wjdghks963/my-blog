import prismaclient from "@libs/server/prismaClient";
import {NextResponse} from 'next/server'

export async function getAllPostId(): Promise<{ postsId: { id: number; }[] }> {
  const postsId = await prismaclient.post.findMany({
    select: {
      id: true,
    },
  });
  return {postsId}
}
