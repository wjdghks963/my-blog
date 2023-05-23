import prismaclient from "@libs/server/prismaClient";
import {NextResponse} from 'next/server'

export async function GET() {
  const postsId = await prismaclient.post.findMany({
    select: {
      id: true,
    },
  });
  return NextResponse.json({postsId});
}
