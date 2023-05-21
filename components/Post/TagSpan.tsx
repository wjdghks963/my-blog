"use client"

import { cls } from "@libs/client/utils";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import React, { useCallback } from "react";
import { setFilterTag } from "store/modules/tagFilter";
import {setSearchQuery} from '../../store/modules/searchQuery'



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

export default function TagSpan({
  tag,
  tagName,
  className,
  clickOk,
  goBlog,
}: TagSpan) {
  const router = useRouter();
  const hiddenFlex = className ?? "";

  const dispatch = useDispatch();

  const filterTag = useCallback(() => {
    dispatch(
      setFilterTag({
        tag,
      })
    );
    dispatch(setSearchQuery({query:""}))
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
        "px-2  border-2 border-black rounded-md dark:border-white dark:text-white",
        clickOk
          ? "hover:ring-2 cursor-pointer ring-black ring-offset-2 ring-black dark:hover:ring-1 dark:hover:ring-white dark:hover:ring-offset-2"
          : ""
      )}
    >
      {tagName ? tagName : tag}
    </span>
  );
}
//
