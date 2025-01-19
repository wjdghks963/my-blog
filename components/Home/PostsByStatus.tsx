import { PostStatus, ThumbnailPostData } from "@types";

import PostWithThumbnail from "@components/Home/PostWithThumbnail";

async function fetchPostsByStatus(status: PostStatus) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APIDOMAIN}/api/main/${status}`, {
    cache: "no-store", // 항상 최신 데이터를 가져오기 위해 no-store 사용
    next: { revalidate: 60 }, // 60초마다 다시 캐싱
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: { json: ThumbnailPostData[] } = await res.json();
  return data.json;
}

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
