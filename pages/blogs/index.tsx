import Layout from "@components/Base/Layout";
import Loading from "@components/Base/Loading";
import TagNavBar from "@components/Blog/TagNavBar";
import MiniPost from "@components/Post/MiniPost";
import { SearchBar } from "@components/Post/SearchBar";
import infiniteBlogsGetKey from "@libs/client/infiniteBlogsGetKey";
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
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite";

export type PostWithId = {
  id: number;
  title: string;
  content: string;
  views: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
};

export interface IPostArr {
  nextCursor?: string;
  data: PostWithId[];
}

export default function Blogs({ tags }: { tags: { tag: string }[] }) {
  /**
   * RTX 선택된 태그 분리
   */
  const selecetedTag = useSelector(
    (state: { tagFilterReducer: { tag: string } }) => state.tagFilterReducer.tag
  );
  const isTagSelected = useSelector(
    (state: { tagFilterReducer: { isSelected: string } }) =>
      state.tagFilterReducer.isSelected
  );

  /**
   * RTX 검색된 값 엔터하면 들어온 값
   */
  const searchQuery = useSelector(
    (state: { searchQueryReducer: { query: string } }) =>
      state.searchQueryReducer.query
  );
  const isQuerySelected = useSelector(
    (state: { searchQueryReducer: { isSelected: string } }) =>
      state.searchQueryReducer.isSelected
  );

  const getKey = (
    pageIndex: any,
    previousPageData: { nextCursor: string } | null
  ): string | null => {
    if (isTagSelected) {
      return infiniteBlogsGetKey(
        pageIndex,
        previousPageData,
        "tag",
        selecetedTag
      );
    }

    return infiniteBlogsGetKey(
      pageIndex,
      previousPageData,
      "query",
      searchQuery
    );
  };

  const { data, setSize, mutate }: SWRInfiniteResponse<IPostArr> =
    useSWRInfinite(getKey);

  const [loading, setLoading] = useState(true);

  /**
   * PostData 재사용
   */
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

  /**
   * 무한 스크롤 Observer & useEffect로 생성, 지우기
   */
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
    <Layout title={"블로그"} url={"/blogs"} description={"블로그 모음"}>
      <TagNavBar tags={tags} mutate={mutate} />
      <SearchBar />
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
