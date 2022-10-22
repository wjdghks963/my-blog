import Layout from "@components/Base/Layout";
import Loading from "@components/Base/Loading";
import TagNavBar from "@components/Blog/TagNavBar";
import MiniPost from "@components/Post/MiniPost";
import { Tag } from "@prisma/client";
import Tags from "pages/api/blogs/tags";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite";

export type PostWithId = {
  id: number;
  title: string;
  content: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
};

export interface IPostArr {
  nextCursor?: string;
  data: PostWithId[];
}

export default function Blogs({ tags }: { tags: { tag: string }[] }) {
  const tagRef = useRef("all");
  const selecetedTag = useSelector(
    (state: { tagFilterReducer: { tag: string } }) => state.tagFilterReducer.tag
  );

  useEffect(() => {
    tagRef.current = selecetedTag;
  }, [selecetedTag]);

  const getKey = (
    pageIndex: any,
    previousPageData: { nextCursor: string } | null
  ): string | null => {
    // nextCoursor가 done이면 종료
    if (previousPageData && previousPageData.nextCursor === "done") return null;
    // 전 데이터 없을때 맨 처음 받아옴 tag는 all로
    if (previousPageData === null && tagRef.current === "") {
      return "/api/blogs?tag=all&limit=5";
    }

    if (previousPageData !== null && tagRef.current === "") {
      return `/api/blogs?tag=all&cursor=${previousPageData?.nextCursor}&limit=5`;
    }
    // 전 데이터 없고 tag가 all이 아니라면
    if (previousPageData === null && tagRef.current !== "") {
      return `/api/blogs?tag=${selecetedTag}&limit=5`;
    }

    // 전 데이터 있고 tag 있다면
    if (previousPageData !== null && tagRef.current !== "") {
      return `/api/blogs?cursor=${previousPageData.nextCursor}&tag=${selecetedTag}&limit=5`;
    }

    // 위의 상황이 아니라면 all을 기준으로 다음 데이터 받아옴
    return `/api/blogs?tag=all&cursor=${previousPageData?.nextCursor}&limit=5`;
  };

  const { data, setSize, mutate }: SWRInfiniteResponse<IPostArr> =
    useSWRInfinite(getKey);

  const [loading, setLoading] = useState(true);

  const posts = useMemo(() => {
    const postData: PostWithId[] = [];

    if (data?.length === 0) return;
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
      }
    },
    [setSize, loading]
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
      <TagNavBar tags={tags} mutate={mutate} />
      <div className="flex flex-col items-center mt-20 pb-10 gap-14 h-full">
        {data && data[0]?.data.length === 0
          ? "결과 없음"
          : posts?.map((data) => <MiniPost key={data.id} data={data} />)}
        {loading ? <Loading loadingRef={loadingRef} /> : null}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const tags = await Tags();

  return { props: { tags } };
}
