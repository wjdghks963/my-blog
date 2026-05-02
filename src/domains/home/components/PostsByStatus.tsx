"use client";

import PostWithThumbnail from "@domains/home/components/PostWithThumbnail";
import { ThumbnailPostData } from "@types";
import Link from "next/link";

interface PostsByStatusProps {
  posts: ThumbnailPostData[];
  variant?: "main" | "modern" | "sidebar" | "index";
}

export default function PostsByStatus({ posts = [], variant = "main" }: PostsByStatusProps) {
  if (variant === "modern") {
    return (
      <div className="grid grid-cols-1 gap-0 mobile:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 6).map((post, index) => (
          <PostWithThumbnail
            key={post.id}
            data={post}
            className={`feature-card border-t border-soft ${
              index % 3 !== 0 ? "lg:border-l" : ""
            } ${index % 2 !== 0 ? "mobile:border-l lg:border-l-0" : ""} ${
              index % 3 !== 0 ? "lg:border-l" : ""
            } border-soft`}
          />
        ))}
      </div>
    );
  }

  if (variant === "index") {
    return (
      <ol className="m-0 list-none p-0">
        {posts.slice(0, 6).map((post, idx) => (
          <li key={post.id}>
            <Link
              href={`/blogs/post/${post.id}`}
              className="index-row group"
            >
              <span className="font-display text-xl font-bold tabular-nums text-muted">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-lg font-bold leading-snug tracking-[-0.01em] mobile:text-xl">
                  <span className="bg-[length:0%_2px] bg-gradient-to-r from-current to-current bg-no-repeat transition-[background-size] duration-200 [background-position:0_100%] group-hover:bg-[length:100%_2px]">
                    {post.title}
                  </span>
                </h3>
                {post.description && (
                  <p className="mt-1 line-clamp-1 text-sm text-muted">{post.description}</p>
                )}
              </div>
              <span className="hidden font-display text-[11px] font-bold uppercase tracking-[0.22em] text-muted tabular-nums mobile:inline">
                {(post.views ?? 0).toLocaleString()} reads
              </span>
            </Link>
          </li>
        ))}
      </ol>
    );
  }

  if (variant === "sidebar") {
    return (
      <div className="space-y-0">
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
