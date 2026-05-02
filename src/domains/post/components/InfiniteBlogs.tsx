"use client";

import MiniPost from "@domains/post/components/MiniPost";
import { postQueryKeys } from "@domains/post/services/post.service";
import { PostWithId } from "@domains/post/types";
import useQuerySelector from "@shared/hooks/useQuerySelector";
import useTagSelector from "@shared/hooks/useTagSelector";
import { httpService } from "@shared/services/http.service";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef } from "react";

export default function InfiniteBlogs() {
  const loadingRef = useRef<HTMLDivElement>(null);
  const { tag } = useTagSelector();
  const { query } = useQuerySelector();

  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: postQueryKeys.list({ tag, query }),
    queryFn: async ({ pageParam }) => {
      const url = `/api/blogs?query=${encodeURIComponent(query)}&tag=${encodeURIComponent(
        tag
      )}&page=${pageParam}&limit=5`;
      return httpService.get<{ hasNextPage: boolean; data: PostWithId[] }>(url);
    },
    initialPageParam: 1,
    getNextPageParam<T extends { hasNextPage: boolean; data: PostWithId[] }>(
      lastPage: T,
      allPages: Array<T>
    ): number | undefined {
      return lastPage.hasNextPage ? allPages.length + 1 : undefined;
    },
  });

  const isFilterLoading = isFetching && !isFetchingNextPage;

  const allData: PostWithId[] = data
    ? data.pages.reduce((prev, curr) => prev.concat(curr.data as PostWithId[]), [] as PostWithId[])
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
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      return;
    }

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
      <div
        className="flex items-baseline justify-between border-b-[1.5px] border-ink pb-3 font-display text-[11px] font-bold uppercase tracking-[0.28em] text-muted"
        aria-live="polite"
      >
        <span>
          {isFilterLoading
            ? "Loading…"
            : allData.length > 0
            ? `${String(allData.length).padStart(2, "0")} entries${hasNextPage ? " shown" : ""}`
            : "No entries"}
        </span>
        <span>{tag && tag !== "all" ? `#${tag}` : "All topics"}</span>
      </div>

      <div className="min-h-[400px]">
        {isFilterLoading ? (
          <div className="divide-y divide-[var(--line-soft)] border-b border-[var(--line-soft)]">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="grid items-center gap-4 py-6"
                style={{ gridTemplateColumns: "60px 1fr 100px" }}
              >
                <div className="h-5 w-10 animate-pulse bg-paper-soft" />
                <div className="space-y-2">
                  <div className="h-5 w-3/4 animate-pulse bg-paper-soft" />
                  <div className="h-3 w-1/2 animate-pulse bg-paper-soft" />
                </div>
                <div className="h-3 animate-pulse bg-paper-soft" />
              </div>
            ))}
          </div>
        ) : allData.length === 0 ? (
          <div className="border-b border-soft py-20 text-center">
            <p className="font-display text-2xl font-bold tracking-[-0.02em] mobile:text-3xl">No matches.</p>
            <p className="mt-2 text-sm text-muted">다른 키워드나 태그로 검색해보세요.</p>
          </div>
        ) : (
          <ol className="m-0 list-none p-0">
            {allData.map((data: PostWithId, index: number) => (
              <li key={data.id}>
                <MiniPost
                  data={data}
                  index={index + 1}
                />
              </li>
            ))}
          </ol>
        )}
      </div>

      {(hasNextPage || isLoading) && !isFilterLoading && (
        <div
          className="flex items-center justify-center py-10 font-display text-[11px] font-bold uppercase tracking-[0.32em] text-muted"
          ref={loadingRef}
        >
          <span className="animate-pulse">Loading more entries…</span>
        </div>
      )}
    </div>
  );
}
