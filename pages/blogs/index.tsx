import MiniPost from "@components/Post/MiniPost";
import React, { useEffect } from "react";
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite";

export type Blog = {
  id: number;
  title: string;
  content: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
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

  if (previousPageData === null) return "/api/blogs/post?limit=2";

  return `/api/blogs/post?cursor=${previousPageData.nextCursor}&limit=2`;
};

export default function Blogs() {
  const { data, size, setSize }: SWRInfiniteResponse<IBlogArr> =
    useSWRInfinite(getKey);
  const posts = data?.map((data) => data?.data && data.data)[0];

  return (
    <div className="flex flex-col">
      {posts?.map((data) => (
        <MiniPost key={data.id} data={data} />
      ))}
    </div>
  );
}
