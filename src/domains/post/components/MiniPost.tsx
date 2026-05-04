"use client";

import { categoryColor } from "@domains/home/utils/categoryColor";
import compareLocaleDate from "@shared/utils/CompareLocaleDate";
import { getReadingTime } from "@shared/utils/utils";
import { PostWithId } from "@types";
import Link from "next/link";

export default function MiniPost({ data }: { data: PostWithId }) {
  const date = compareLocaleDate(data.updatedAt, data.createdAt);
  const readingTime = getReadingTime(data.content);
  const href = `/blogs/post/${data.id}`;
  const cat = (data as PostWithId & { category?: string | null }).category ?? null;
  const color = categoryColor(cat);

  return (
    <article
      style={{
        padding: "20px 0",
        borderBottom: "1px solid var(--rule-2)",
      }}
    >
      <div className="mb-2 flex items-center gap-2.5">
        {cat && (
          <>
            <span className="tiny-label" style={{ color, fontWeight: 600 }}>
              {cat}
            </span>
            <span style={{ color: "var(--ink-4)" }}>·</span>
          </>
        )}
        <span className="tiny-label" style={{ color: "var(--ink-3)" }}>
          {date}
        </span>
      </div>

      <Link href={href} prefetch={false} className="group block">
        <h3
          className="font-serif group-hover:underline"
          style={{
            margin: "0 0 8px",
            fontSize: 22,
            lineHeight: 1.18,
            letterSpacing: "-0.01em",
            fontWeight: 500,
            color: "var(--ink)",
            textDecorationThickness: 1,
          }}
        >
          {data.title}
        </h3>
      </Link>

      {data.description && (
        <p
          style={{
            margin: "0 0 12px",
            fontSize: 13.5,
            lineHeight: 1.55,
            color: "var(--ink-2)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {data.description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-1.5">
        {data.tags.slice(0, 4).map((tag, i) => (
          <span
            key={i}
            className="font-mono"
            style={{
              fontSize: 10.5,
              color: "var(--ink-3)",
              padding: "2px 6px",
              border: "1px solid var(--rule)",
              borderRadius: 2,
            }}
          >
            #{tag.tag}
          </span>
        ))}
        {data.tags.length > 4 && (
          <span className="font-mono" style={{ fontSize: 10.5, color: "var(--ink-4)" }}>
            +{data.tags.length - 4}
          </span>
        )}
        <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--ink-3)" }}>
          {data.views.toLocaleString()} views · {readingTime}분
        </span>
      </div>
    </article>
  );
}
