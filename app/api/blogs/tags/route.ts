import { NextResponse } from "next/server";

import prismaclient from "@libs/server/prismaClient";

export async function GET() {
  try {
    const tags = await prismaclient.tag.findMany({
      select: {
        tag: true,
      },
    });
    return NextResponse.json({ tags });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ err: e });
  }
}
