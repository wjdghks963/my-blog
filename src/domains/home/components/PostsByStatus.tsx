import PostWithThumbnail from "@domains/home/components/PostWithThumbnail";
import { PostStatus, ThumbnailPostData } from "@types";

// @ts-ignore
export default async function PostsByStatus({ status }: { status: PostStatus }): any {
  const posts = await fetchPostsByStatus(status);

  return (
    <div className="flex gap-2">
      {posts.map((post: any, index: any) => (
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
    console.error("Failed to fetch posts:", res.status, res.statusText);
    return [];
  }

  const result = await res.json();
  return result.json || [];
}
