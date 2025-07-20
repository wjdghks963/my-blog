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

  // Modern card variant
  if (className?.includes("modern-card")) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          y: -8,
          transition: { duration: 0.3 },
        }}
        className="group cursor-pointer"
        onClick={() => moveToPost(data.id)}
      >
        <div className="backdrop-blur-md bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
          {/* Thumbnail */}
          {data.thumbnail && (
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={data.thumbnail}
                alt="Thumbnail"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                quality={80}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-3 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              {data.title}
            </h3>

            {data.description && (
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">{data.description}</p>
            )}

            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>조회 {data.views}</span>
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full">
                읽어보기
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Sidebar card variant
  if (className?.includes("sidebar-card")) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: 4 }}
        className="group cursor-pointer"
        onClick={() => moveToPost(data.id)}
      >
        <div className="backdrop-blur-md bg-white/5 dark:bg-gray-900/10 border border-white/10 dark:border-gray-700/20 rounded-xl p-4 hover:bg-white/10 dark:hover:bg-gray-900/20 transition-all duration-300">
          <div className="flex gap-3">
            {data.thumbnail && (
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={data.thumbnail}
                  alt="Thumbnail"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  quality={60}
                  fill
                  sizes="64px"
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-gray-800 dark:text-white mb-1 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                {data.title}
              </h4>

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>조회 {data.views}</span>
                <div className="w-2 h-2 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default variant (original)
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        zIndex: 3,
      }}
      transition={{ duration: 0.3 }}
      className={cls(
        className ?? "",
        "group w-full mobile:w-1/5 text-black flex flex-col bg-white rounded-lg overflow-hidden shadow-md cursor-pointer transform transition-all duration-300"
      )}
      onClick={() => moveToPost(data.id)}
    >
      {/* Thumbnail */}
      {data.thumbnail && (
        <div className="relative w-full h-32 aspect-w-16 aspect-h-9 overflow-hidden hidden mobile:block">
          <Image
            src={data.thumbnail}
            alt="Thumbnail"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            quality={80}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-4">
        <div>
          <h3 className="font-bold text-base mobile:text-lg mb-2 line-clamp-3 text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
            {data.title}
          </h3>
          {data.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3 hidden mobile:block">{data.description}</p>
          )}
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>조회 {data.views}</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
        </div>
      </div>
    </motion.div>
  );
}
