"use client";

import InfiniteBlogs from "@domains/post/components/InfiniteBlogs";
import { SearchBar } from "@domains/post/components/SearchBar";
import TagNavBar from "@domains/post/components/TagNavBar";
import TagNavBarSkeleton from "@domains/post/components/TagNavBarSkeleton";
import React, { Suspense } from "react";

export default function PostListPage() {
  return (
    <main className="min-h-screen pb-12 pt-20">
      <div className="page-shell space-y-6">
        <section className="surface-card p-5 mobile:p-6">
          <Suspense fallback={<TagNavBarSkeleton />}>
            <TagNavBar />
          </Suspense>
        </section>

        <section className="surface-card p-5 mobile:p-6">
          <SearchBar />
        </section>

        <section className="surface-card p-5 mobile:p-8">
          <InfiniteBlogs />
        </section>
      </div>
    </main>
  );
}
