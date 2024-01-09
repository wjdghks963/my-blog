import { Metadata } from "next";
import Link from "next/link";
import React, { Suspense } from "react";

import Footer from "@components/Base/Footer";
import CategoriesBox from "@components/Home/CategoriesBox";
import CategoriesBoxSkeleton from "@components/Home/CategoriesBoxSkeleton";
import PostsByStatus from "@components/Home/PostsByStatus";
import PostsByStatusSkeleton from "@components/Home/PostsByStatusSkeleton";

export const metadata: Metadata = {
  title: "Jung Blog",
  description: "최정환의 기술 블로그",
  openGraph: {
    title: "Jung Blog",
    description: "최정환의 기술 블로그",
  },
};

export default function Page() {
  return (
    <div className={"mx-10 mt-16"}>
      <div className="flex flex-col my-10">
        <h1 className="font-bold text-4xl mb-10 font-serif">Recent Posts</h1>

        <Suspense fallback={<PostsByStatusSkeleton count={5} />}>
          <PostsByStatus status={"recent"} />
        </Suspense>
      </div>
      <div className=" flex flex-col my-10">
        <h1 className="font-bold text-4xl mb-10 font-serif">Popular Posts</h1>
        <Suspense fallback={<PostsByStatusSkeleton count={5} />}>
          <PostsByStatus status={"popular"} />
        </Suspense>
      </div>

      <div className="hidden mobile:flex flex-col mt-10 pb-10">
        <h1 className="font-bold text-4xl mb-10 font-serif">By Category</h1>
        <Suspense fallback={<CategoriesBoxSkeleton />}>
          <CategoriesBox />
        </Suspense>
      </div>
      <div className="my-5">
        <div className="pb-5 flex font-extrabold text-2xl font-serif">
          안녕하세요
          <span className="ml-5 animate-[wave_2s_linear_infinite]">👋</span>
        </div>
        <span>개발자 최정환입니다.</span>
        <span className="block break-words font-serif">
          <br />이 블로그는 Next.js, TailwindCSS, Redux Tool Kit, Prisma 로 만들어졌습니다. 호스팅과 ssl은 CloudFlare,
          프론트, 백엔드 배포는 vercel, DB 서버는 PlanetScale을 사용했습니다.
          <br /> 궁금한 점이 있다면 chsw000@gmail.com로 연락주세요.
        </span>

        <Link href={"https://github.com/wjdghks963/my-blog"}>
          <span className="block mt-4 cursor-pointer font-bold">깃헙 레포 구경가기 &rarr; </span>
        </Link>
        {/*<Link*/}
        {/*  href={*/}
        {/*    "https://63635e18291535f4d01657be-csrykgcgxo.chromatic.com/?path=/story/components-base-headerli--normal"*/}
        {/*  }*/}
        {/*>*/}
        {/*  <span className="block mt-4 cursor-pointer font-bold">Story Book 구경가기 &rarr; </span>*/}
        {/*</Link>*/}
      </div>
      <Footer />
    </div>
  );
}
