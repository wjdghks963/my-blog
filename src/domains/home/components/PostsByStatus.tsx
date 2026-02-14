"use client";

import PostWithThumbnail from "@domains/home/components/PostWithThumbnail";

interface PostSummary {
  id: number;
  title: string;
  description: string;
  tags: { tag: string }[];
}

interface PostsByStatusProps {
  posts: PostSummary[];
  variant?: "main" | "modern" | "sidebar";
}

export default function PostsByStatus({ posts = [], variant = "main" }: PostsByStatusProps) {
  if (variant === "modern") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 6).map((post) => (
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
        {posts.slice(0, 5).map((post) => (
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
