import CategoriesBox from "@domains/home/components/CategoriesBox";
import CategoriesBoxSkeleton from "@domains/home/components/CategoriesBoxSkeleton";
import PostsByStatus from "@domains/home/components/PostsByStatus";
import PostsByStatusSkeleton from "@domains/home/components/PostsByStatusSkeleton";
import Footer from "@shared/components/Footer";
import { Metadata } from "next";
import Link from "next/link";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Jung's Tech Blog: Web Dev & Beyond",
  description:
    "프론트엔드 개발을 중심으로, 서버 인프라까지 다양한 기술 분야를 학습하고 다루는 최정환의 기술 블로그입니다.",
  openGraph: {
    title: "Jung Blog",
    description:
      "프론트엔드 개발을 중심으로, 서버 인프라까지 다양한 기술 분야를 학습하고 다루는 최정환의 기술 블로그입니다.",
  },
};

export default function Page() {
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
                    filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))",
                  }}
                >
                  Jung's Tech Blog
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
                <span className="font-light">사용자 경험을 고민하는 개발자</span>
                <br />
                <span className="text-lg text-gray-600 dark:text-gray-300">기술과 일상의 균형을 기록합니다</span>
              </p>

              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="backdrop-blur-sm bg-white/5 dark:bg-gray-800/10 rounded-2xl p-4 border border-white/10 dark:border-gray-700/20">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                    25+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Posts</div>
                </div>
                <div className="backdrop-blur-sm bg-white/5 dark:bg-gray-800/10 rounded-2xl p-4 border border-white/10 dark:border-gray-700/20">
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                    5+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
                </div>
                <div className="backdrop-blur-sm bg-white/5 dark:bg-gray-800/10 rounded-2xl p-4 border border-white/10 dark:border-gray-700/20">
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    2K+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Views</div>
                </div>
                <div className="backdrop-blur-sm bg-white/5 dark:bg-gray-800/10 rounded-2xl p-4 border border-white/10 dark:border-gray-700/20">
                  <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    2025
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
                </div>
              </div>

              {/* Tech Stack Icons */}
              <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
                <div className="backdrop-blur-sm bg-white/5 dark:bg-gray-800/10 rounded-xl p-3 border border-white/10 dark:border-gray-700/20 hover:bg-white/10 dark:hover:bg-gray-800/20 transition-all duration-300 group">
                  <svg
                    className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm-1.5 16.5h-3v-9h3v9zm1.5-4.5h3v4.5h-3V12z" />
                  </svg>
                </div>
                <div className="backdrop-blur-sm bg-white/5 dark:bg-gray-800/10 rounded-xl p-3 border border-white/10 dark:border-gray-700/20 hover:bg-white/10 dark:hover:bg-gray-800/20 transition-all duration-300 group">
                  <svg
                    className="w-6 h-6 text-cyan-500 group-hover:scale-110 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.3 3.113.54zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.01 1.36-.034-.44.572-.895 1.095-1.36 1.563-.455-.468-.91-.991-1.36-1.563z" />
                  </svg>
                </div>
                <div className="backdrop-blur-sm bg-white/5 dark:bg-gray-800/10 rounded-xl p-3 border border-white/10 dark:border-gray-700/20 hover:bg-white/10 dark:hover:bg-gray-800/20 transition-all duration-300 group">
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white group-hover:scale-110 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
                  </svg>
                </div>
                <div className="backdrop-blur-sm bg-white/5 dark:bg-gray-800/10 rounded-xl p-3 border border-white/10 dark:border-gray-700/20 hover:bg-white/10 dark:hover:bg-gray-800/20 transition-all duration-300 group">
                  <svg
                    className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
                  </svg>
                </div>
                <div className="backdrop-blur-sm bg-white/5 dark:bg-gray-800/10 rounded-xl p-3 border border-white/10 dark:border-gray-700/20 hover:bg-white/10 dark:hover:bg-gray-800/20 transition-all duration-300 group">
                  <svg
                    className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
                  </svg>
                </div>
              </div>

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
                    status={"recent"}
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
                      status={"popular"}
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
