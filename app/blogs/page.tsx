"use client";

import TagNavBarSkeleton from "@domains/post/components/TagNavBarSkeleton";
import dynamic from "next/dynamic";

const PostListClient = dynamic(() => import("@domains/post/pages/post-list.page"), {
  ssr: false,
  loading: () => (
    <main
      className="min-h-screen px-6 mobile:px-14"
      style={{ background: "var(--paper)", color: "var(--ink)", paddingTop: 44 }}
    >
      <div className="tiny-label" style={{ color: "var(--accent)", marginBottom: 14 }}>
        ARCHIVE
      </div>
      <div
        className="h-12 w-64 animate-pulse"
        style={{ background: "var(--paper-2)", borderRadius: 4 }}
      />
      <div className="mt-8">
        <TagNavBarSkeleton />
      </div>
    </main>
  ),
});

export default function BlogsPage() {
  return <PostListClient />;
}
