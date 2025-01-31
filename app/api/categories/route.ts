import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { NextResponse } from "next/server";

import prismaclient from "@libs/server/prismaClient";

export async function GET(_: Request) {
  try {
    const categories = await prismaclient.category.findMany({
      orderBy: { category: "desc" },
      select: {
        id: true,
        category: true,
      },
    });
    return NextResponse.json({ categories });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error_message: err });
  }
}
