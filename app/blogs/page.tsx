"use client";

import React, { Suspense } from "react";

import InfiniteBlogs from "@components/Blog/InfiniteBlogs";
import TagNavBar from "@components/Blog/TagNavBar";
import TagNavBarSkeleton from "@components/Blog/TagNavBarSkeleton";
import { SearchBar } from "@components/Post/SearchBar";

export default function Blogs() {
  return (
    <>
      <Suspense fallback={<TagNavBarSkeleton />}>
        <TagNavBar />
      </Suspense>
      {/*<SearchBar />*/}
      <InfiniteBlogs />
    </>
  );
}
