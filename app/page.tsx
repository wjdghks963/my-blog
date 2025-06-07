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
    <div className="mx-10 mt-16">
      <div className="flex flex-col my-10">
        <h1 className="font-bold text-4xl mb-10 font-serif relative text-black dark:text-white">
          <span className="absolute left-1 top-1 text-gray-300 dark:hidden">Recent Posts</span>
          <span
            className="hidden dark:block absolute inset-0 text-white"
            style={{
              textShadow: "0 0 5px #00FFFF, 0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 40px #00FFFF",
            }}
          >
            Recent Posts
          </span>
          Recent Posts
        </h1>
        <Suspense fallback={<PostsByStatusSkeleton count={5} />}>
          <PostsByStatus status={"recent"} />
        </Suspense>
      </div>
      <div className=" flex flex-col my-10">
        <h1 className="font-bold text-4xl mb-10 font-serif relative text-black dark:text-white">
          <span className="absolute left-1 top-1 text-gray-300 dark:hidden">Popular Posts</span>
          <span
            className="hidden dark:block absolute inset-0 text-white"
            style={{ textShadow: "0 0 10px #FF00FF, 0 0 20px #FF00FF, 0 0 30px #FF00FF" }}
          >
            Popular Posts
          </span>
          Popular Posts
        </h1>
        <Suspense fallback={<PostsByStatusSkeleton count={5} />}>
          <PostsByStatus status={"popular"} />
        </Suspense>
      </div>

      <div className="hidden mobile:flex flex-col mt-10 pb-10">
        <h1 className="font-bold text-4xl mb-10 font-serif relative text-black dark:text-white">
          <span className="absolute left-1 top-1 text-gray-300 dark:hidden">By Category</span>
          <span
            className="hidden dark:block absolute inset-0 text-white"
            style={{ textShadow: "0 0 5px #FFFF00, 0 0 10px #FFFF00, 0 0 20px #FFFF00, 0 0 40px #FFFF00" }}
          >
            By Category
          </span>
          By Category
        </h1>
        <Suspense fallback={<CategoriesBoxSkeleton />}>
          <CategoriesBox />
        </Suspense>
      </div>

      <div className="my-5">
        <div className="pb-5 flex font-extrabold text-2xl">
          안녕하세요
          <span className="ml-5 animate-[wave_2s_linear_infinite]">👋</span>
        </div>
        <span className="block break-words">
          사용자 경험을 고민하는 개발자입니다.
          <br />
          문제를 구조화하고 지속 가능한 개선을 추구합니다.
          <br />
          기술과 일상의 균형을 기록합니다.
        </span>

        <Link href={"https://github.com/wjdghks963/my-blog"}>
          <span className="block mt-4 cursor-pointer font-bold">이 블로그의 깃헙 레포 구경가기 &rarr; </span>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
