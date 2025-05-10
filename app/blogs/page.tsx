"use client";

import React, { Suspense } from "react";

import InfiniteBlogs from "@/domains/blog/components/InfiniteBlogs";
import TagNavBar from "@/domains/blog/components/TagNavBar";
import TagNavBarSkeleton from "@/domains/blog/components/TagNavBarSkeleton";
import { SearchBar } from "@/domains/post/components/SearchBar";

export default function Blogs() {
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
