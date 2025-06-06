"use client";

import InfiniteBlogs from "@domains/post/components/InfiniteBlogs";
import { SearchBar } from "@domains/post/components/SearchBar";
import TagNavBar from "@domains/post/components/TagNavBar";
import TagNavBarSkeleton from "@domains/post/components/TagNavBarSkeleton";
import React, { Suspense } from "react";

export default function PostListPage() {
  return (
    <>
      <Suspense fallback={<TagNavBarSkeleton />}>
        <TagNavBar />
      </Suspense>
      <SearchBar />
      <InfiniteBlogs />
    </>
  );
}
