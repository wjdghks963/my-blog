import Layout from "@components/Base/Layout";
import { PostWithId } from "./blogs";
import PostWithThumnail from "@components/Home/PostWithThumnail";
import Link from "next/link";
import { CategoryBox } from "@components/Home/CategoryBox";

export type category = {
  category: string;
  posts: { id: number; title: string }[];
};

interface SSRData {
  popularPosts: PostWithId[];
  recentPosts: PostWithId[];
  categories: category[];
}

export default function Home({ data }: { data: SSRData }) {
  console.log(data.categories);
  return (
    <Layout
      title={"Jung's Blog"}
      className={"mt-3 px-10"}
      keywords="프론트 엔드 기술 블로그"
    >
      <div className="flex flex-col mt-10">
        <h1 className="font-bold text-4xl">Recent Posts</h1>
        <div className="flex flex-row gap-5 mt-10 ">
          {data?.recentPosts.map((post, index) => {
            if (index === 4) {
              return (
                <PostWithThumnail key={index} data={post} isMobile={true} />
              );
            }
            return <PostWithThumnail key={index} data={post} />;
          })}
        </div>
      </div>
      <div className=" flex flex-col mt-10">
        <h1 className="font-bold text-4xl">Popular Posts</h1>
        <div className="flex flex-row gap-5 mt-10">
          {data?.popularPosts.map((post, index) => {
            if (index === 4) {
              return (
                <PostWithThumnail key={index} data={post} isMobile={true} />
              );
            }
            return <PostWithThumnail key={index} data={post} />;
          })}
        </div>
      </div>

      <div className=" flex flex-col mt-10 pb-10">
        <h1 className="font-bold text-4xl">By Category</h1>
        <div className="flex flex-row gap-5 mt-10 overflow-x-scroll scrollbar-hide overflow-clip">
          {data.categories.map((category, index) => (
            <CategoryBox key={index} category={category} />
          ))}
        </div>
      </div>
      <div className="my-5">
        <div className="pb-5 flex font-extrabold text-2xl">
          안녕하세요{" "}
          <span className="ml-5 animate-[wave_2s_linear_infinite]">👋</span>
        </div>
        <span>Front-End 개발자 최정환입니다.</span>
        <span className="block break-words">
          <br />이 블로그는 Next.js, TailwindCSS, Redux Tool Kit, Prisma 로
          만들어졌습니다.
          <br /> 궁금한 점이 있다면 chsw000@gmail.com로 연락주세요.
        </span>

        <Link href={"/blogs/post"}>
          <a className="hidden  sm:block mt-4 cursor-pointer font-bold">
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
}

export async function getServerSideProps(): Promise<{
  props: { data: SSRData };
}> {
  const URL =
    process.env.NODE_ENV === "production"
      ? "https://www.sabgilnote.xyz/api"
      : "http://localhost:3000/api";

  const res = await fetch(URL);
  const data = await res.json();

  return { props: { data } };
}
