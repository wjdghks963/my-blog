"use client";

import TagNavBarSkeleton from "@domains/post/components/TagNavBarSkeleton";
import dynamic from "next/dynamic";

const PostListClient = dynamic(() => import("@domains/post/pages/post-list.page"), {
  ssr: false,
  loading: () => (
    <main className="min-h-screen pb-12 pt-20">
      <div className="page-shell space-y-6">
        <section className="surface-card p-5 mobile:p-6">
          <TagNavBarSkeleton />
        </section>
        <section className="surface-card p-5 mobile:p-6">
          <div className="h-12 animate-pulse rounded-lg bg-slate-300/60 dark:bg-slate-700/60" />
        </section>
      </div>
    </main>
  ),
});

export default function BlogsPage() {
  return <PostListClient />;
}
