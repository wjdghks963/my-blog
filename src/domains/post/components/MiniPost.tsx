"use client";

import TagSpan from "@shared/components/TagSpan";
import compareLocaleDate from "@shared/utils/CompareLocaleDate";
import { PostWithId } from "@types";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const jitter = {
  scale: [1, 1.05, 1, 1.05, 1], // 객체가 조금씩 확대되었다 축소되는 효과를 줍니다.
  rotate: [0, 1.5, -1.5, 1.5, -1.5, 0], // 객체가 좌우로 약간 회전합니다.
  transition: {
    duration: 0.3, // 애니메이션의 지속 시간을 0.3초로 설정합니다.
    yoyo: Infinity, // 애니메이션을 무한 반복합니다.
  },
};

export default function MiniPost({ data }: { data: PostWithId }) {
  const router = useRouter();
  const date = compareLocaleDate(data.updatedAt, data.createdAt);
  const moveToPost = (id: number) => {
    return router.push(`/blogs/post/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => router.prefetch(`/blogs/post/${data.id}`)}
      onFocus={() => router.prefetch(`/blogs/post/${data.id}`)}
      onClick={() => moveToPost(data.id)}
      className="w-full max-w-md cursor-pointer"
    >
      {/* Glass Card */}
      <div className="relative backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border-2 border-white/20 dark:border-gray-700/30 hover:border-indigo-300/50 dark:hover:border-indigo-500/50 rounded-3xl p-8 shadow-2xl overflow-hidden transition-colors duration-300">
        {/* Content */}
        <div className="relative z-10 space-y-4">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 leading-tight">{data.title}</h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">{data?.description}</p>

          {/* Date */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="18"
                rx="2"
                ry="2"
                strokeWidth={2}
              ></rect>
              <line
                x1="16"
                y1="2"
                x2="16"
                y2="6"
                strokeWidth={2}
              ></line>
              <line
                x1="8"
                y1="2"
                x2="8"
                y2="6"
                strokeWidth={2}
              ></line>
              <line
                x1="3"
                y1="10"
                x2="21"
                y2="10"
                strokeWidth={2}
              ></line>
            </svg>
            {date}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {data.tags.slice(0, 4).map((tag, index) => (
              <div
                key={index}
                className="backdrop-blur-sm bg-white/20 dark:bg-gray-800/30 border border-white/30 dark:border-gray-600/40 rounded-xl px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-200"
              >
                #{tag.tag}
              </div>
            ))}
            {data.tags.length > 4 && (
              <div className="backdrop-blur-sm bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-300/30 dark:border-indigo-600/40 rounded-xl px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                +{data.tags.length - 4}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
