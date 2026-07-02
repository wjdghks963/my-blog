"use client";

import MiniPost from "@domains/post/components/MiniPost";
import { postQueryKeys } from "@domains/post/services/post.service";
import { PostWithId } from "@domains/post/types";
import { httpService } from "@shared/services/http.service";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef } from "react";

export default function InfiniteBlogs() {
  const loadingRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag") ?? "all";
  const query = searchParams.get("query") ?? "";

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
    // 검색어·태그를 바꾸는 동안 이전 결과를 유지해 스켈레톤 깜빡임을 막는다.
    placeholderData: keepPreviousData,
    // 글 목록은 자주 바뀌지 않으므로 캐시를 길게 잡아, 같은 검색어·태그 재요청 시
    // 네트워크 호출(=Vercel 함수 실행) 없이 캐시에서 즉시 응답한다.
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // 최초 로딩(보여줄 데이터가 전혀 없을 때)에만 스켈레톤을 노출한다.
  const showSkeleton = isLoading;
  // 필터를 바꾸는 동안에는 기존 목록을 살짝 흐리게 처리한다.
  const isRefreshing = isFetching && !isFetchingNextPage && !isLoading;

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
          {!showSkeleton && allData.length > 0 ? (
            <>
              총 <span className="font-semibold text-[var(--text-primary)]">{allData.length}</span>개 포스트
              {hasNextPage ? " 표시 중" : ""}
            </>
          ) : null}
        </span>
      </div>

      <div className="min-h-[400px]">
        {showSkeleton ? (
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
          <div
            className="grid grid-cols-1 gap-x-12 lg:grid-cols-2"
            style={{
              opacity: isRefreshing ? 0.5 : 1,
              transition: "opacity 150ms ease",
            }}
          >
            {allData?.map((data: PostWithId) => (
              <MiniPost key={data.id} data={data} />
            ))}
          </div>
        )}
      </div>

      {(hasNextPage || isLoading) && !isRefreshing && (
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
