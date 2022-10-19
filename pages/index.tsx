import type { NextPage } from "next";
import Layout from "@components/Base/Layout";
import { useSession, signIn, signOut } from "next-auth/react";
import useSWR, { SWRResponse } from "swr";
import { PostWithId } from "./blogs";
import PostWithThumnail from "@components/Home/PostWithThumnail";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "@components/Base/Loading";
interface Posts {
  popularPosts: PostWithId[];
  recentPosts: PostWithId[];
}

const Home: NextPage = () => {
  const { data } = useSWR<Posts>("/api/");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    data !== undefined ? setLoading(false) : setLoading(true);
  }, [loading, data]);

  return (
    <Layout title={"Jung's Blog"} url={""} className={"mt-3 px-10"}>
      <div className="flex flex-col mt-10">
        <h1 className="font-bold text-4xl">Recent Posts</h1>
        <div className="flex flex-row gap-5 mt-10 ">
          {loading ? (
            <Loading className="w-full flex items-center justify-center font-bold" />
          ) : (
            data?.recentPosts.map((post, index) => (
              <PostWithThumnail key={index} data={post} />
            ))
          )}
        </div>
      </div>
      <div className=" flex flex-col mt-10 pb-10">
        <h1 className="font-bold text-4xl">Popular Posts</h1>
        <div className="flex flex-row gap-5 mt-10">
          {loading ? (
            <Loading className="w-full flex items-center justify-center font-bold" />
          ) : (
            data?.popularPosts.map((post, index) => (
              <PostWithThumnail key={index} data={post} />
            ))
          )}
        </div>
      </div>
      <div className="my-5">
        <div className="pb-5 flex font-extrabold text-2xl">
          안녕하세요{" "}
          <span className="ml-5 animate-[wave_2s_linear_infinite]">👋</span>
        </div>
        <span>Front-End 개발자 최정환입니다.</span>
        <span className="block break-words">
          UX와 개발자로서의 기술 경험을 중요하게 생각하며 이것들을 향상시키기
          위해서 새로운 것을 배우는데 거부감이 없습니다.
          <br />
          <br />이 블로그는 Next.js TailwindCSS Redux Prisma 로 만들어졌습니다.
          <br /> 버그나 궁금한 점이 있다면 chsw000@gmail.com로 연락주세요.
        </span>

        <Link href={"/blogs/post"}>
          <a className="block mt-4 cursor-pointer font-bold">
            글 쓰는 페이지 구경가기 &rarr;{" "}
          </a>
        </Link>
        <Link href={"https://github.com/wjdghks963/my-blog"}>
          <a className="block mt-4 cursor-pointer font-bold">
            깃헙 레포 구경가기 &rarr;{" "}
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
