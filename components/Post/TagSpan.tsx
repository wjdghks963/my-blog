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
}: {
  tag: string;
  tagName?: string;
  className?: string;
  mutate: KeyedMutator<IPostArr[]>;
  clickOk?: boolean;
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
    router.push("/blogs");
    return mutate([]);
  }, [dispatch, mutate, router, tag]);

  return (
    <span
      onClick={() => (clickOk ? filterTag() : null)}
      className={cls(
        hiddenFlex,
        "px-2 cursor-pointer border-2 border-black rounded-md dark:border-white "
      )}
    >
      {tagName ? tagName : tag}
    </span>
  );
}
//hover:ring-2 ring-offset-2 ring-blackdark:hover:ring-1 dark:hover:ring-white dark:hover:ring-offset-2
