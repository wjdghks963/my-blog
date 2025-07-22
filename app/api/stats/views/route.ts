import { NextResponse } from "next/server";

import prismaclient from "@libs/server/prismaClient";

export async function GET() {
  try {
    const totalViews = await prismaclient.post.aggregate({
      _sum: {
        views: true,
      },
    });

    const totalPosts = await prismaclient.post.count();
    const totalCategories = await prismaclient.category.count();

    return NextResponse.json({
      totalViews: totalViews._sum.views || 0,
      totalPosts,
      totalCategories,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
