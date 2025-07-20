"use client";

import InfiniteBlogs from "@domains/post/components/InfiniteBlogs";
import { SearchBar } from "@domains/post/components/SearchBar";
import TagNavBar from "@domains/post/components/TagNavBar";
import TagNavBarSkeleton from "@domains/post/components/TagNavBarSkeleton";
import React, { Suspense } from "react";

export default function PostListPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Main Content */}
      <div>
        {/* Navigation and Search Section */}
        <section className="pt-20 pb-8 px-6 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="backdrop-blur-xl bg-white/5 dark:bg-gray-900/10 border border-white/10 dark:border-gray-700/20 rounded-3xl p-6 shadow-xl mb-8">
              <Suspense fallback={<TagNavBarSkeleton />}>
                <TagNavBar />
              </Suspense>
            </div>

            <div className="backdrop-blur-xl bg-white/5 dark:bg-gray-900/10 border border-white/10 dark:border-gray-700/20 rounded-3xl p-6 shadow-xl">
              <SearchBar />
            </div>
          </div>
        </section>

        {/* Posts Section */}
        <section className="px-6 sm:px-10 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="backdrop-blur-xl bg-white/5 dark:bg-gray-900/10 border border-white/10 dark:border-gray-700/20 rounded-3xl p-8 shadow-xl">
              <InfiniteBlogs />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
