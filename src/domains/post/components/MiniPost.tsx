"use client";

import compareLocaleDate from "@shared/utils/CompareLocaleDate";
import { getReadingTime } from "@shared/utils/utils";
import { PostWithId } from "@types";
import Link from "next/link";
import React from "react";

export default function MiniPost({ data, index }: { data: PostWithId; index?: number }) {
  const date = compareLocaleDate(data.updatedAt, data.createdAt);
  const readingTime = getReadingTime(data.content);
  const href = `/blogs/post/${data.id}`;

  return (
    <article className="group">
      <Link
        href={href}
        prefetch={false}
        className="grid items-baseline gap-4 border-b border-[var(--line-soft)] py-6 transition-colors hover:bg-paper-soft mobile:py-7"
        style={{ gridTemplateColumns: "60px 1fr 110px" }}
      >
        <span className="font-display text-base font-bold tabular-nums text-muted mobile:text-lg">
          {index !== undefined ? String(index).padStart(2, "0") : ""}
        </span>

        <div className="min-w-0">
          <h3 className="font-display text-xl font-bold leading-snug tracking-[-0.01em] mobile:text-2xl">
            <span className="bg-[length:0%_2px] bg-gradient-to-r from-current to-current bg-no-repeat transition-[background-size] duration-200 [background-position:0_100%] group-hover:bg-[length:100%_2px]">
              {data.title}
            </span>
          </h3>

          {data?.description && (
            <p className="mt-1 line-clamp-2 text-sm text-ink-soft mobile:text-base">{data.description}</p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
            <span>{date}</span>
            <span aria-hidden>·</span>
            <span>{readingTime} min read</span>
            <span aria-hidden>·</span>
            <span>{data.views.toLocaleString()} reads</span>
            {data.tags.slice(0, 3).map((tag, i) => (
              <React.Fragment key={i}>
                <span aria-hidden>·</span>
                <span>#{tag.tag}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        <span
          aria-hidden
          className="hidden text-right font-display text-xs font-bold uppercase tracking-[0.22em] text-muted transition-transform group-hover:translate-x-1 group-hover:text-ink mobile:inline"
        >
          Read →
        </span>
      </Link>
    </article>
  );
}
