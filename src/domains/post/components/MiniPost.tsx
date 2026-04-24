"use client";

import compareLocaleDate from "@shared/utils/CompareLocaleDate";
import { getReadingTime } from "@shared/utils/utils";
import { PostWithId } from "@types";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MiniPost({ data }: { data: PostWithId }) {
  const date = compareLocaleDate(data.updatedAt, data.createdAt);
  const readingTime = getReadingTime(data.content);
  const href = `/blogs/post/${data.id}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-2xl"
    >
      <Link
        href={href}
        prefetch={false}
        className="group block h-full rounded-2xl border border-soft bg-white/65 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:bg-white/5 dark:focus-visible:ring-offset-slate-900"
      >
        <div className="space-y-4">
          <h3 className="text-2xl font-bold leading-tight text-[var(--text-primary)] group-hover:text-brand">{data.title}</h3>

          <p className="line-clamp-3 leading-relaxed text-muted">{data?.description}</p>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <span>{date}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--text-muted)]" />
            <span>{readingTime}분 읽기</span>
            <span className="h-1 w-1 rounded-full bg-[var(--text-muted)]" />
            <span>조회 {data.views}</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {data.tags.slice(0, 4).map((tag, index) => (
              <span
                key={index}
                className="rounded-full border border-soft bg-white/70 px-3 py-1 text-xs font-medium text-[var(--text-primary)] dark:bg-white/10"
              >
                #{tag.tag}
              </span>
            ))}
            {data.tags.length > 4 && (
              <span className="rounded-full border border-soft px-3 py-1 text-xs font-medium text-muted">
                +{data.tags.length - 4}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
