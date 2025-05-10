import { PostStatus, ThumbnailPostData } from "@/domains/post/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import PostWithThumbnail from "./PostWithThumbnail";

// @ts-ignore
export default async function PostsByStatus({ status }: { status: PostStatus }): any {
  const posts = await fetchPostsByStatus(status);

  return (
    <div className="flex gap-2">
      {posts.map((post, index) => (
        <PostWithThumbnail
          key={post.id}
          data={post}
          className={[3, 4].includes(index) ? "hidden mobile:flex" : ""}
        />
      ))}
    </div>
  );
}

async function fetchPostsByStatus(status: PostStatus) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APIDOMAIN}/api/main/${status}`, {
    next: { revalidate: 60 }, // 60초마다 다시 캐싱
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: { json: ThumbnailPostData[] } = await res.json();
  return data.json;
}
