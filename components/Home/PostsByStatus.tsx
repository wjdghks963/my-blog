import { PostStatus, ThumbnailPostData } from "@types";
import process from "process";
import React from "react";

import PostWithThumbnail from "@components/Home/PostWithThumbnail";

// @ts-ignore
export default async function PostsByStatus({ status }: { status: PostStatus }): any {
  const data = await fetchData(status);

  return (
    <div className="flex gap-2">
      {data?.json?.map((post: ThumbnailPostData, index: number) => {
        return (
          <PostWithThumbnail
            key={index}
            data={post}
            className={index === 4 ? "hidden mobile:flex" : ""}
          />
        );
      })}
    </div>
  );
}

async function fetchData(status: PostStatus) {
  const res = await fetch(process.env.NEXT_PUBLIC_APIDOMAIN + `/api/main/${status}`, {
    cache: "no-store",
  });
  return await res.json();
}
