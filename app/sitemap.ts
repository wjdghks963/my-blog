// /app/sitemap.ts
import { MetadataRoute } from "next";

import prismaclient from "@libs/server/prismaClient";

// sitemap 함수의 반환 타입 명시를 위해 추가

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 반환 타입 명시
  const baseUrl = "https://www.junglog.xyz";

  // 정적 URL 리스트
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      priority: 1.0, // 홈페이지 우선순위
      changeFrequency: "weekly", // 홈페이지는 주 단위 변경 가정
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date().toISOString(),
      priority: 0.9, // 블로그 목록 페이지는 높은 우선순위
      changeFrequency: "daily", // 블로그 목록은 자주 변경됨
    },
    {
      url: `${baseUrl}/about-me`,
      lastModified: new Date().toISOString(),
      priority: 0.8,
      changeFrequency: "monthly", // About Me 페이지는 월 단위 변경 가정
    },
    {
      url: `${baseUrl}/update-note`,
      lastModified: new Date().toISOString(),
      priority: 0.7,
      changeFrequency: "monthly", // 업데이트 노트는 월 단위 변경 가정
    },
  ];

  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const postsData = await prismaclient.post.findMany({
      // 타입 세이프한 쿼리로 변경
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc", // 최신 글부터 가져오도록 (선택 사항)
      },
    });

    dynamicRoutes = postsData.map((post) => {
      const lastModified = post.updatedAt || post.createdAt; // updatedAt이 null일 경우 createdAt 사용
      return {
        url: `${baseUrl}/blogs/post/${post.id}`,
        lastModified: new Date(lastModified).toISOString(), // toISOString()으로 변환
        priority: 0.7, // 게시물 우선순위 (0.5 ~ 0.8 사이가 일반적)
        changeFrequency: "monthly", // 게시물은 월 단위 변경 가정
      };
    });
  } catch (error) {
    console.error("Failed to fetch dynamic routes for sitemap:", error);
    // 오류 발생 시 dynamicRoutes는 빈 배열로 유지됨
  }

  return [...staticRoutes, ...dynamicRoutes];
}
