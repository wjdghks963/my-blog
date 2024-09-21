// /app/sitemap.ts
import prismaclient from "@libs/server/prismaClient";

export default async function sitemap() {
  // 정적 URL 리스트 (홈페이지, 정적 페이지 등)
  const staticRoutes = ["", "/about-me"].map((route) => ({
    url: `https://www.junglog.xyz${route}`,
    lastModified: new Date().toISOString(),
    priority: 3.0,
    changeFrequency: "yearly",
  }));

  const postIds = await prismaclient.$queryRaw<{ id: number; lastModified: Date }[]>`
        SELECT id, GREATEST("createdAt", "updatedAt") AS "lastModified"
        FROM "Post"    
      `;

  // 동적으로 생성할 URL을 API 또는 데이터베이스에서 가져오는 예시
  const dynamicRoutes = postIds.map((post) => ({
    url: `https://www.junglog.xyz/blogs/post/${post.id}`,
    lastModified: post.lastModified,
    priority: 0.8,
  }));

  // sitemap.xml에 사용할 URL 리스트 반환
  return [...staticRoutes, ...dynamicRoutes];
}
