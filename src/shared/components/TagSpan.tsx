"use client";

import { cls } from "@shared/utils/utils";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import { setSearchQuery } from "@store/modules/searchQuery";
import { setFilterTag } from "@store/modules/tagFilter";

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
  const hiddenFlex = className ?? "";

  const dispatch = useDispatch();

  const filterTag = useCallback(() => {
    dispatch(
      setFilterTag({
        tag,
      })
    );
    dispatch(setSearchQuery({ query: "" }));
  }, [dispatch, tag]);

  const filterMutate = () => {
    filterTag();
  };

  const filterGoBlog = () => {
    filterTag();
    router.push("/blogs");
  };

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
