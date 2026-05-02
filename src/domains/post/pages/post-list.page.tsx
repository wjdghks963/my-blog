"use client";

import InfiniteBlogs from "@domains/post/components/InfiniteBlogs";
import { SearchBar } from "@domains/post/components/SearchBar";
import TagNavBar from "@domains/post/components/TagNavBar";
import TagNavBarSkeleton from "@domains/post/components/TagNavBarSkeleton";
import React, { Suspense } from "react";

export default function PostListPage() {
  return (
    <main className="min-h-screen pb-16">
      <section className="border-b-[1.5px] border-ink">
        <div className="page-shell pt-10 mobile:pt-14">
          <div className="flex items-baseline justify-between">
            <span className="eyebrow">Section</span>
            <span className="eyebrow">The Archive</span>
          </div>
          <hr className="rule-thick mt-3" />
          <div className="grid gap-6 pt-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h1 className="display-headline text-5xl mobile:text-7xl lg:text-8xl">Writing.</h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                기록은 다음 일을 위한 가장 빠른 학습 도구입니다. 주제별로 살펴보거나 키워드로 찾으세요.
              </p>
            </div>
            <div className="flex items-end lg:col-span-4">
              <p className="border-l-[1.5px] border-ink pl-4 font-display text-[11px] font-bold uppercase leading-relaxed tracking-[0.22em] text-ink-soft">
                Filter by topic. <br />
                Search by keyword. <br />
                Read in any order.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-soft">
        <div className="page-shell py-8">
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <span className="eyebrow">Topics</span>
          </div>
          <Suspense fallback={<TagNavBarSkeleton />}>
            <TagNavBar />
          </Suspense>
        </div>
      </section>

      <section className="border-b border-soft">
        <div className="page-shell py-6">
          <SearchBar />
        </div>
      </section>

      <section>
        <div className="page-shell py-10">
          <InfiniteBlogs />
        </div>
      </section>
    </main>
  );
}
