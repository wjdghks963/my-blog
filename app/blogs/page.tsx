"use client";

import TagNavBarSkeleton from "@domains/post/components/TagNavBarSkeleton";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// 클라이언트 컴포넌트들을 dynamic import로 로드
const PostListClient = dynamic(() => import("@domains/post/pages/post-list.page"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="pt-20 pb-8 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 rounded-3xl p-6 shadow-xl mb-8">
            <TagNavBarSkeleton />
          </div>
          <div className="bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 rounded-3xl p-6 shadow-xl">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
});

export default function BlogsPage() {
  return <PostListClient />;
}
