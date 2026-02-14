"use client";

import { cls } from "@shared/utils/utils";
import { ThumbnailPostData } from "@types";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PostWithThumbnail({ data, className }: { data: ThumbnailPostData; className?: string }) {
  const router = useRouter();

  const moveToPost = (id: number) => {
    router.push(`/blogs/post/${id}`);
  };

  if (className?.includes("modern-card")) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        className="group cursor-pointer"
        onClick={() => moveToPost(data.id)}
      >
        <div className="h-full rounded-2xl border border-soft bg-white/65 p-4 shadow-sm transition-all duration-200 hover:shadow-lg dark:bg-white/5">
          {data.thumbnail && (
            <div className="relative mb-4 h-44 w-full overflow-hidden rounded-xl">
              <Image
                src={data.thumbnail}
                alt="Thumbnail"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                quality={75}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          <h3 className="mb-2 line-clamp-2 text-lg font-bold text-[var(--text-primary)]">{data.title}</h3>

          {data.description && <p className="mb-4 line-clamp-3 text-sm text-muted">{data.description}</p>}

          <div className="flex items-center justify-between text-xs text-muted">
            <span>조회 {data.views}</span>
            <span className="rounded-full border border-soft px-2 py-1">Read</span>
          </div>
        </div>
      </motion.article>
    );
  }

  if (className?.includes("sidebar-card")) {
    return (
      <motion.article
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: 2 }}
        className="group cursor-pointer"
        onClick={() => moveToPost(data.id)}
      >
        <div className="rounded-xl border border-soft bg-white/55 p-3 transition-colors duration-200 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10">
          <div className="flex gap-3">
            {data.thumbnail && (
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={data.thumbnail}
                  alt="Thumbnail"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  quality={60}
                  fill
                  sizes="64px"
                />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h4 className="mb-1 line-clamp-2 text-sm font-semibold text-[var(--text-primary)]">{data.title}</h4>
              <span className="text-xs text-muted">조회 {data.views}</span>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={cls(
        className ?? "",
        "group w-full mobile:w-1/5 cursor-pointer overflow-hidden rounded-xl border border-soft bg-white/60 transition-all duration-200 dark:bg-white/5"
      )}
      onClick={() => moveToPost(data.id)}
    >
      {data.thumbnail && (
        <div className="relative hidden h-32 w-full overflow-hidden mobile:block">
          <Image
            src={data.thumbnail}
            alt="Thumbnail"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            quality={75}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="mb-2 line-clamp-3 text-base font-bold text-[var(--text-primary)] mobile:text-lg">{data.title}</h3>
          {data.description && <p className="mb-3 hidden line-clamp-2 text-sm text-muted mobile:block">{data.description}</p>}
        </div>
        <div className="flex items-center justify-between text-xs text-muted">
          <span>조회 {data.views}</span>
          <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">→</span>
        </div>
      </div>
    </motion.article>
  );
}
