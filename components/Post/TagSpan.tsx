import { cls } from "@libs/client/utils";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import React, { useCallback } from "react";
import { setFilterTag } from "store/modules/tagFilter";
import { IPostArr } from "pages/blogs";
import { KeyedMutator } from "swr";

export default function TagSpan({
  tag,
  tagName,
  className,
  mutate,
  clickOk,
  goBlog,
}: {
  tag: string;
  tagName?: string;
  className?: string;
  mutate?: KeyedMutator<IPostArr[]>;
  clickOk?: boolean;
  goBlog?: boolean;
}) {
  const router = useRouter();
  const hiddenFlex = className ? className : "";

  const dispatch = useDispatch();
  const filterTag = useCallback(() => {
    dispatch(
      setFilterTag({
        tag,
      })
    );
  }, [dispatch, mutate, tag]);

  const filterMutate = () => {
    filterTag();
    mutate([]);
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
        "px-2 cursor-pointer border-2 border-black rounded-md dark:border-white",
        clickOk
          ? "hover:ring-2 ring-black ring-offset-2 ring-blackdark:hover:ring-1 dark:hover:ring-white dark:hover:ring-offset-2"
          : ""
      )}
    >
      {tagName ? tagName : tag}
    </span>
  );
}
//
