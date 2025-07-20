"use client";

import MiniPost from "@domains/post/components/MiniPost";
import { PostWithId } from "@domains/post/types";
import useQuerySelector from "@shared/hooks/useQuerySelector";
import useTagSelector from "@shared/hooks/useTagSelector";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";

import searchingCat from "@public/searching_cat.png";

export default function InfiniteBlogs() {
  const loadingRef = useRef<HTMLDivElement>(null);
  const { tag } = useTagSelector();
  const { query } = useQuerySelector();

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["posts", tag, query],
    queryFn: ({ pageParam }) =>
      fetch(`/api/blogs?query=${query}&tag=${tag}&page=${pageParam}&limit=5`).then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch blogs: ${res.status}`);
        }
        return res.json();
      }),
    initialPageParam: 1,
    getNextPageParam<T extends { hasNextPage: boolean; data: any[] }>(
      lastPage: T,
      allPages: Array<T>
    ): number | undefined {
      return lastPage.hasNextPage ? allPages.length + 1 : undefined;
    },
  });

  const allData: PostWithId[] = data
    ? data.pages.reduce((prev, curr) => prev.concat(curr.data as PostWithId[]), [])
    : [];

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isLoading) {
        return fetchNextPage();
      }
    },
    [hasNextPage, isLoading, fetchNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.2,
    });
    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }
    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <div className="w-full">
      {/* Posts Grid */}
      <div className="min-h-[400px]">
        {allData.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 rounded-3xl p-12 shadow-2xl">
              <Image
                className="w-32 h-32 mx-auto mb-6 opacity-70"
                src={searchingCat}
                alt={"검색 결과 없음"}
              />
              <h3 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-200">검색 결과가 없습니다</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">다른 키워드나 태그로 검색해보세요</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {allData?.map((data: PostWithId, index: number) => (
              <div
                key={data.id}
                className={`flex justify-center ${index % 2 === 0 ? "lg:mt-0" : "lg:mt-12"}`}
              >
                <MiniPost data={data} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Loading Indicator */}
      {(hasNextPage || isLoading) && (
        <div className="flex justify-center py-12">
          <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 rounded-2xl p-8 shadow-xl">
            <div
              className={`flex flex-col items-center ${hasNextPage || isLoading ? "animate-bounce" : ""}`}
              ref={loadingRef}
            >
              <Image
                className="w-20 h-20 opacity-80"
                src={searchingCat}
                alt={"다음 페이지를 찾고 있는 고양이"}
              />
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
                더 많은 포스트를 찾고 있어요...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
