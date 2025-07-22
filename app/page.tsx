import CategoriesBox from "@domains/home/components/CategoriesBox";
import CategoriesBoxSkeleton from "@domains/home/components/CategoriesBoxSkeleton";
import PostsByStatus from "@domains/home/components/PostsByStatus";
import PostsByStatusSkeleton from "@domains/home/components/PostsByStatusSkeleton";
import Footer from "@shared/components/Footer";
import SkillSet from "@shared/components/SkillSet";
import Link from "next/link";
import React, { Suspense } from "react";

async function fetchStats() {
  try {
    // 서버 컴포넌트에서는 절대 URL 사용
    const baseUrl = process.env.NEXT_PUBLIC_APIDOMAIN;
    const response = await fetch(`${baseUrl}/api/stats/views`, {
      next: { revalidate: 60 },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    // 서버 컴포넌트에서는 console.error 대신 다른 방법 사용
  }

  // 기본값 반환
  return {
    totalViews: 0,
    totalPosts: 0,
    totalCategories: 0,
  };
}

async function fetchPostsByStatus(status: "recent" | "popular") {
  try {
    // 서버 컴포넌트에서는 절대 URL 사용
    const baseUrl = process.env.NEXT_PUBLIC_APIDOMAIN;
    const res = await fetch(`${baseUrl}/api/main/${status}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return [];
    }

    const result = await res.json();
    return result.json || [];
  } catch (error) {
    return [];
  }
}

export default async function Page() {
  // 실제 API 호출로 변경
  const [stats, recentPosts, popularPosts] = await Promise.all([
    fetchStats(),
    fetchPostsByStatus("recent"),
    fetchPostsByStatus("popular"),
  ]);

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
        {/* Hero Section with Glassmorphism */}
        <section className="min-h-[50vh] flex items-center justify-center px-6 sm:px-10 pt-8">
          <div className="text-center max-w-5xl">
            {/* Glassmorphism Hero Card */}
            <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
              {/* Glow Effect Title */}
              <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent leading-tight">
                <span
                  className="block drop-shadow-2xl"
                  style={{
                    filter: "drop-shadow(0 0 30px rgba(139, 92, 246, 0.4))",
                  }}
                >
                  JungHwan's Blog
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
                기술과 경험을 공유하는 공간입니다
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stats.totalPosts}+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.totalCategories}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                    {stats.totalViews >= 1000 ? `${(stats.totalViews / 1000).toFixed(1)}K+` : `${stats.totalViews}+`}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">2</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years</div>
                </div>
              </div>

              {/* Tech Stack Icons */}
              <SkillSet />

              {/* Social Links */}
              <div className="flex justify-center items-center gap-4 mb-8">
                <Link
                  href="https://github.com/wjdghks963"
                  className="group backdrop-blur-sm bg-white/5 dark:bg-gray-800/10 rounded-xl p-3 border border-white/10 dark:border-gray-700/20 hover:bg-white/10 dark:hover:bg-gray-800/20 transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white group-hover:scale-110 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/junghwan-choi-a238b1228"
                  className="group backdrop-blur-sm bg-white/5 dark:bg-gray-800/10 rounded-xl p-3 border border-white/10 dark:border-gray-700/20 hover:bg-white/10 dark:hover:bg-gray-800/20 transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
                <Link
                  href="/3d-space"
                  className="group backdrop-blur-sm bg-white/5 dark:bg-gray-800/10 rounded-xl p-3 border border-white/10 dark:border-gray-700/20 hover:bg-white/10 dark:hover:bg-gray-800/20 transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6 text-purple-500 group-hover:scale-110 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </Link>
              </div>

              {/* Floating Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/blogs"
                  className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">블로그 탐색하기</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <Link
                  href="/about-me"
                  className="px-8 py-4 backdrop-blur-md bg-white/20 dark:bg-gray-800/30 border border-white/30 dark:border-gray-600/30 text-gray-800 dark:text-gray-200 rounded-2xl font-semibold text-lg hover:bg-white/30 dark:hover:bg-gray-800/40 transform hover:scale-105 transition-all duration-300"
                >
                  About Me
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="px-6 sm:px-10 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Recent Posts Section */}
            <div className="mb-16">
              <div className="backdrop-blur-xl bg-white/5 dark:bg-gray-900/10 border border-white/10 dark:border-gray-700/20 rounded-3xl p-8 shadow-xl">
                <h2 className="text-4xl font-bold mb-10 text-center">
                  <span
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent"
                    style={{
                      filter: "drop-shadow(0 0 15px rgba(6, 182, 212, 0.3))",
                    }}
                  >
                    Recent Posts
                  </span>
                </h2>
                <Suspense fallback={<PostsByStatusSkeleton count={5} />}>
                  <PostsByStatus
                    posts={recentPosts}
                    variant="modern"
                  />
                </Suspense>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Popular Posts - 2/3 width */}
              <div className="lg:col-span-2">
                <div className="backdrop-blur-xl bg-white/5 dark:bg-gray-900/10 border border-white/10 dark:border-gray-700/20 rounded-3xl p-8 shadow-xl h-full">
                  <h2 className="text-4xl font-bold mb-10 text-center">
                    <span
                      className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent"
                      style={{
                        filter: "drop-shadow(0 0 15px rgba(236, 72, 153, 0.3))",
                      }}
                    >
                      Popular Posts
                    </span>
                  </h2>
                  <Suspense fallback={<PostsByStatusSkeleton count={5} />}>
                    <PostsByStatus
                      posts={popularPosts}
                      variant="modern"
                    />
                  </Suspense>
                </div>
              </div>

              {/* Sidebar - 1/3 width */}
              <div className="space-y-8">
                {/* Categories */}
                <div className="backdrop-blur-xl bg-white/5 dark:bg-gray-900/10 border border-white/10 dark:border-gray-700/20 rounded-3xl p-6 shadow-xl">
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    <span
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
                      style={{
                        filter: "drop-shadow(0 0 15px rgba(16, 185, 129, 0.3))",
                      }}
                    >
                      Categories
                    </span>
                  </h3>
                  <Suspense fallback={<CategoriesBoxSkeleton />}>
                    <CategoriesBox />
                  </Suspense>
                </div>

                {/* Personal Info Card */}
                <div className="backdrop-blur-xl bg-white/5 dark:bg-gray-900/10 border border-white/10 dark:border-gray-700/20 rounded-3xl p-6 shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-4 flex items-center justify-center">
                      안녕하세요
                      <span className="ml-2 animate-[wave_2s_linear_infinite]">👋</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      문제를 구조화하고 지속 가능한 개선을 추구합니다.
                    </p>
                    <Link
                      href="https://github.com/wjdghks963/my-blog"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      GitHub 구경가기
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
