"use client";

import InfiniteBlogs from "@domains/post/components/InfiniteBlogs";
import { SearchBar } from "@domains/post/components/SearchBar";
import TagNavBar from "@domains/post/components/TagNavBar";
import TagNavBarSkeleton from "@domains/post/components/TagNavBarSkeleton";
import { FooterStrip } from "@domains/home/components/editorial/Editorial";
import React, { Suspense } from "react";

export default function PostListPage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <header
        className="px-6 mobile:px-14"
        style={{
          paddingTop: 44,
          paddingBottom: 28,
          borderBottom: "2px solid var(--ink)",
        }}
      >
        <div className="tiny-label" style={{ color: "var(--accent)", marginBottom: 14 }}>
          ARCHIVE
        </div>
        <h1
          className="font-serif"
          style={{
            margin: 0,
            fontSize: "clamp(40px, 6vw, 64px)",
            lineHeight: 1,
            fontWeight: 500,
            fontStyle: "italic",
            letterSpacing: "-0.02em",
            color: "var(--ink)",
          }}
        >
          Blogs<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p
          style={{
            margin: "14px 0 0",
            maxWidth: 580,
            fontSize: 14.5,
            lineHeight: 1.6,
            color: "var(--ink-2)",
          }}
        >
          태그·키워드로 글을 좁혀 봅니다. 카테고리는 좌측 상단 네비게이션에서.
        </p>
      </header>

      <section
        className="px-6 mobile:px-14"
        style={{ paddingTop: 20, paddingBottom: 20, borderBottom: "1px solid var(--rule)" }}
      >
        <div className="tiny-label" style={{ color: "var(--ink-3)", marginBottom: 10 }}>
          태그로 좁히기
        </div>
        <Suspense fallback={<TagNavBarSkeleton />}>
          <TagNavBar />
        </Suspense>
      </section>

      <section
        className="px-6 mobile:px-14"
        style={{ paddingTop: 24, paddingBottom: 24, borderBottom: "1px solid var(--rule)" }}
      >
        <SearchBar />
      </section>

      <section className="px-6 mobile:px-14" style={{ paddingTop: 32, paddingBottom: 48 }}>
        <InfiniteBlogs />
      </section>

      <FooterStrip />
    </main>
  );
}
