"use client";

import CategoryNavBar from "@domains/post/components/CategoryNavBar";
import InfiniteBlogs from "@domains/post/components/InfiniteBlogs";
import { SearchBar } from "@domains/post/components/SearchBar";
import TagNavBar from "@domains/post/components/TagNavBar";
import { FooterStrip } from "@domains/home/components/editorial/Editorial";
import React, { Suspense } from "react";

interface PostListPageProps {
  tags: { tag: string }[];
  categories: { category: string }[];
}

export default function PostListPage({ tags, categories }: PostListPageProps) {
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
          카테고리·태그·키워드로 글을 좁혀 봅니다.
        </p>
      </header>

      <section
        className="px-6 mobile:px-14"
        style={{ paddingTop: 20, paddingBottom: 20, borderBottom: "1px solid var(--rule)" }}
      >
        <div className="tiny-label" style={{ color: "var(--ink-3)", marginBottom: 10 }}>
          카테고리로 좁히기
        </div>
        <Suspense fallback={<div className="h-7" />}>
          <CategoryNavBar categories={categories} />
        </Suspense>
      </section>

      <section
        className="px-6 mobile:px-14"
        style={{ paddingTop: 20, paddingBottom: 20, borderBottom: "1px solid var(--rule)" }}
      >
        <div className="tiny-label" style={{ color: "var(--ink-3)", marginBottom: 10 }}>
          태그로 좁히기
        </div>
        <TagNavBar tags={tags} />
      </section>

      <section
        className="px-6 mobile:px-14"
        style={{ paddingTop: 24, paddingBottom: 24, borderBottom: "1px solid var(--rule)" }}
      >
        <Suspense
          fallback={
            <div
              className="h-10 w-full animate-pulse"
              style={{ background: "var(--paper-2)", borderRadius: 4 }}
            />
          }
        >
          <SearchBar />
        </Suspense>
      </section>

      <section className="px-6 mobile:px-14" style={{ paddingTop: 32, paddingBottom: 48 }}>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse"
                  style={{
                    height: 110,
                    borderBottom: "1px solid var(--rule-2)",
                    background: "linear-gradient(90deg, var(--paper-2) 0%, transparent 60%)",
                  }}
                />
              ))}
            </div>
          }
        >
          <InfiniteBlogs />
        </Suspense>
      </section>

      <FooterStrip />
    </main>
  );
}
