"use client";

import useTagSelector from "@shared/hooks/useTagSelector";
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
  const dispatch = useDispatch();
  const { tag: activeTag } = useTagSelector();

  const isActive = activeTag === tag || (tag === "all" && (!activeTag || activeTag === "all"));

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
    if (!clickOk) return;
    goBlog ? filterGoBlog() : filterMutate();
  };

  const usesPill = className?.includes("pill");

  return (
    <span
      onClick={clickFunction}
      data-active={isActive ? "true" : "false"}
      className={cls(
        className ?? "",
        usesPill
          ? ""
          : "inline-flex items-center border border-ink px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-ink",
        clickOk ? "cursor-pointer" : ""
      )}
    >
      {tagName ?? tag}
    </span>
  );
}
