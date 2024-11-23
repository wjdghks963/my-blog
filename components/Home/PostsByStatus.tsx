"use client";

import { useQuery } from "@tanstack/react-query";
import { PostStatus, ThumbnailPostData } from "@types";
import process from "process";
import React from "react";

import PostWithThumbnail from "@components/Home/PostWithThumbnail";

export default function PostsByStatus({ status }: { status: PostStatus }): any {
  const { data } = useQuery<{ json: [ThumbnailPostData] }>({
    queryKey: ["PostsByStatus", status],
    queryFn: async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_APIDOMAIN + `/api/main/${status}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    },

    staleTime: Infinity,
  });

  return (
    <div className="flex gap-2">
      {data?.json?.map((post: ThumbnailPostData, index: number) => {
        return (
          <PostWithThumbnail
            key={index}
            data={post}
            className={[3, 4].includes(index) ? "hidden mobile:flex" : ""}
          />
        );
      })}
    </div>
  );
}
