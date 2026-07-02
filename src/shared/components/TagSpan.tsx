"use client";

import { cls } from "@shared/utils/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback } from "react";

export interface TagSpan {
  /** 데이터로 받은 태그 이름 */
  tag: string;
  /** 프론트로 나오는 태그 이름 데이터와 바꾸고 싶다면 바꿈*/
  tagName?: string;
  /** 스타일 바꿀것이 있다면 */
  className?: string;
  /** 클릭이 가능한지 가능하다면 해당하는 태그가 설정되어 있는 /blog로 */
  clickOk?: boolean;
  /** 해당하는 태그로 설정이 되어있는 /blog에 갈 수 있는지 */
  goBlog?: boolean;
}

export default function TagSpan({ tag, tagName, className, clickOk, goBlog }: TagSpan) {
  const router = useRouter();
  const pathname = usePathname();
  const hiddenFlex = className ?? "";

  const buildTagParams = useCallback(() => {
    // 태그를 바꿀 때는 검색어를 함께 초기화한다.
    const params = new URLSearchParams();
    if (tag && tag !== "all") {
      params.set("tag", tag);
    }
    return params.toString();
  }, [tag]);

  const filterMutate = useCallback(() => {
    const queryString = buildTagParams();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  }, [buildTagParams, router, pathname]);

  const filterGoBlog = useCallback(() => {
    const queryString = buildTagParams();
    router.push(queryString ? `/blogs?${queryString}` : "/blogs");
  }, [buildTagParams, router]);

  const clickFunction = () => {
    clickOk ? (goBlog ? filterGoBlog() : filterMutate()) : null;
  };

  return (
    <span
      onClick={() => clickFunction()}
      className={cls(
        hiddenFlex,
        "px-2 border rounded-md border-soft text-[var(--text-primary)] dark:text-[var(--text-primary)] font-roboto-regular",
        clickOk
          ? "cursor-pointer transition-colors hover:bg-white/80 dark:hover:bg-white/10"
          : ""
      )}
    >
      {tagName ? tagName : tag}
    </span>
  );
}
