"use client";

import MiniPost from "@domains/post/components/MiniPost";
import { postQueryKeys } from "@domains/post/services/post.service";
import { PostWithId } from "@domains/post/types";
import useQuerySelector from "@shared/hooks/useQuerySelector";
import useTagSelector from "@shared/hooks/useTagSelector";
import { httpService } from "@shared/services/http.service";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
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
    // 브라우저 환경 체크
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
        className="mb-6 flex items-center justify-between text-sm text-muted"
        aria-live="polite"
      >
        <span>
          {isFilterLoading ? (
            "불러오는 중…"
          ) : allData.length > 0 ? (
            <>
              총 <span className="font-semibold text-[var(--text-primary)]">{allData.length}</span>개 포스트
              {hasNextPage ? " 표시 중" : ""}
            </>
          ) : null}
        </span>
      </div>

      <div className="min-h-[400px]">
        {isFilterLoading ? (
          <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse"
                style={{
                  height: 110,
                  borderBottom: "1px solid var(--rule-2)",
                  background:
                    "linear-gradient(90deg, var(--paper-2) 0%, transparent 60%)",
                }}
              />
            ))}
          </div>
        ) : allData.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            style={{ borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}
          >
            <Image
              className="mx-auto mb-6 opacity-60"
              src="/searching_cat.png"
              alt="검색 결과 없음"
              width={96}
              height={96}
            />
            <h3
              className="font-serif"
              style={{
                fontSize: 28,
                fontStyle: "italic",
                fontWeight: 500,
                color: "var(--ink)",
                margin: 0,
              }}
            >
              검색 결과가 없습니다
            </h3>
            <p style={{ marginTop: 8, fontSize: 13, color: "var(--ink-3)", maxWidth: 360 }}>
              다른 키워드나 태그로 다시 시도해보세요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-2">
            {allData?.map((data: PostWithId) => (
              <MiniPost key={data.id} data={data} />
            ))}
          </div>
        )}
      </div>

      {(hasNextPage || isLoading) && !isFilterLoading && (
        <div
          ref={loadingRef}
          className="flex justify-center py-10"
          style={{
            fontSize: 12,
            color: "var(--ink-3)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <span className="inline-flex items-center gap-2">
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--accent)",
              }}
              className="animate-pulse"
            />
            계속 불러오는 중…
          </span>
        </div>
      )}
    </div>
  );
}
