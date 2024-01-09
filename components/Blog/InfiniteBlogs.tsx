"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { PostWithId } from "@types";
import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";

import useQuerySelector from "@libs/client/useQuerySelector";
import useTagSelector from "@libs/client/useTagSelector";

import searchingCat from "@public/searching_cat.png";

import MiniPost from "@components/Post/MiniPost";

const getPosts = async (query?: string, tag?: string, pageParam?: number) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_APIDOMAIN + `/api/blogs?query=${query}&tag=${tag}&page=${pageParam}&limit=5`
  );
  return response.json();
};

export default function InfiniteBlogs() {
  const loadingRef = useRef<HTMLDivElement>(null);
  const { tag } = useTagSelector();
  const { query } = useQuerySelector();

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["posts", tag, query],
    queryFn: ({ pageParam = 1 }) => getPosts(query, tag, pageParam),
    initialPageParam: 1,
    getNextPageParam<InfinitePostArr>(
      lastPage: { hasNextPage: boolean },
      allPages: Array<InfinitePostArr>
    ): number | undefined {
      return lastPage.hasNextPage ? allPages.length + 1 : undefined;
    },
  });

  const allData = data ? data.pages.reduce((prev, curr) => prev.concat(curr.data), []) : [];

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
    <>
      <div className="flex flex-col items-center mt-20 pb-10 gap-14">
        {allData.length === 0 && !isLoading ? (
          "결과 없음"
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
            {allData?.map((data: PostWithId, index: number) => (
              <div
                key={data.id}
                className={`flex justify-center col-span-1 my-14 ${index % 2 === 0 ? "lg:mb-24" : "lg:mt-24"}`}
              >
                <MiniPost data={data} />
              </div>
            ))}
          </div>
        )}

        <div
          className={hasNextPage || isLoading ? "animate-bounce" : ""}
          ref={loadingRef}
        >
          <Image
            className="w-24"
            src={searchingCat}
            alt={"다음 페이지를 찾고 있는 고양이"}
          />
        </div>
      </div>
    </>
  );
}
