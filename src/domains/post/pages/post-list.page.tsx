"use client";

import InfiniteBlogs from "@domains/post/components/InfiniteBlogs";
import { SearchBar } from "@domains/post/components/SearchBar";
import TagNavBar from "@domains/post/components/TagNavBar";
import TagNavBarSkeleton from "@domains/post/components/TagNavBarSkeleton";
import React, { Suspense } from "react";

export default function PostListPage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background with Organic Blobs */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900"></div>

        {/* Floating Organic Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-pink-300/30 to-purple-400/30 dark:from-pink-500/20 dark:to-purple-600/20 blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 rounded-full bg-gradient-to-r from-blue-300/25 to-cyan-400/25 dark:from-blue-500/15 dark:to-cyan-600/15 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 rounded-full bg-gradient-to-r from-green-300/20 to-emerald-400/20 dark:from-green-500/10 dark:to-emerald-600/10 blur-3xl animate-pulse delay-2000"></div>

        {/* Window Shadow Overlay */}
        <div
          className="absolute inset-0 opacity-10 dark:opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.05) 76%, transparent 77%),
              linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.05) 76%, transparent 77%)
            `,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
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
