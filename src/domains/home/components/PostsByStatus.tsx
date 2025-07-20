import PostWithThumbnail from "@domains/home/components/PostWithThumbnail";

type PostStatus = "recent" | "popular";

interface PostsByStatusProps {
  status: PostStatus;
  variant?: "main" | "modern" | "sidebar";
}

function PostsByStatusClient({ posts, variant = "main" }: { posts: any[]; variant?: "main" | "modern" | "sidebar" }) {
  if (variant === "modern") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 6).map((post: any, index: any) => (
          <PostWithThumbnail
            key={post.id}
            data={post}
            className="modern-card"
          />
        ))}
      </div>
    );
  }

  if (variant === "sidebar") {
    return (
      <div className="space-y-4">
        {posts.slice(0, 5).map((post: any, index: any) => (
          <PostWithThumbnail
            key={post.id}
            data={post}
            className="sidebar-card"
          />
        ))}
      </div>
    );
  }

  // Default main variant
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

export default async function PostsByStatus({ status, variant = "main" }: PostsByStatusProps) {
  const posts = await fetchPostsByStatus(status);

  return (
    <PostsByStatusClient
      posts={posts}
      variant={variant}
    />
  );
}
