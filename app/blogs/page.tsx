"use client";

import dynamic from "next/dynamic";

const PostListClient = dynamic(() => import("@domains/post/pages/post-list.page"), {
  ssr: false,
  loading: () => (
    <main className="min-h-screen pb-16">
      <section className="border-b-[1.5px] border-ink">
        <div className="page-shell pt-10 mobile:pt-14">
          <div className="flex items-baseline justify-between">
            <span className="eyebrow">Section</span>
            <span className="eyebrow">The Archive</span>
          </div>
          <hr className="rule-thick mt-3" />
          <div className="pt-8">
            <h1 className="display-headline text-5xl mobile:text-7xl lg:text-8xl">Writing.</h1>
          </div>
        </div>
      </section>
      <div className="page-shell space-y-6 py-8">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="h-7 w-20 animate-pulse border border-soft bg-paper-soft"
              style={{ width: `${Math.random() * 40 + 60}px` }}
            />
          ))}
        </div>
        <div className="h-10 w-full animate-pulse border-b-[1.5px] border-ink" />
      </div>
    </main>
  ),
});

export default function BlogsPage() {
  return <PostListClient />;
}
