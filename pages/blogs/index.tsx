import Layout from "@components/Layout";
import Loading from "@components/Loading";
import MiniPost from "@components/Post/MiniPost";
import { GetServerSideProps } from "next";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite";

export type Blog = {
  id: number;
  title: string;
  content: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  tags: { tag: string }[];
};

interface IBlogArr {
  data: Blog[];
}

const getKey = (
  pageIndex: any,
  previousPageData: { nextCursor: string } | null
): string | null => {
  // 전 데이터 없을때 맨 처음 받아옴
  if (previousPageData && previousPageData.nextCursor === "done") return null;

  if (previousPageData === null) return "/api/blogs?limit=5";

  return `/api/blogs?cursor=${previousPageData.nextCursor}&limit=5`;
};

export default function Blogs({ firstPosts }) {
  const { data, setSize }: SWRInfiniteResponse<IBlogArr> =
    useSWRInfinite(getKey);
  const [loading, setLoading] = useState(true);

  const posts = useMemo(() => {
    const postData: Blog[] = [];
    data?.map((data) => postData.push(...data.data));
    data && data[data?.length - 1].nextCursor === "done"
      ? setLoading(false)
      : setLoading(true);
    return postData;
  }, [data]);

  const loadingRef = useRef<HTMLDivElement>(null);

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      const target = entries[0];

      if (target.isIntersecting) {
        setSize((size) => size + 1);
      } else {
      }
    },
    [setSize]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loadingRef.current) observer.observe(loadingRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <Layout title={"블로그"} url={""} description={"블로그 모음"}>
      <div className="flex flex-col items-center mt-20 pb-10 gap-14 h-full">
        {posts?.map((data) => (
          <MiniPost key={data.id} data={data} />
        ))}
        {loading ? <Loading loadingRef={loadingRef} /> : null}
      </div>
    </Layout>
  );
}

// export async function getServerSideProps(context): GetServerSideProps {
//   const res = await fetch("http://localhost:3000/api/blogs/post?limit=2");
//   console.log(res);
//   //const firstPosts = res.json();
//   return {
//     props: {
//       //  firstPosts,
//     },
//   };
// }
