"use client";

import { ThumbnailPostData } from "@/domains/post/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { cls } from "@libs/client/utils";
import TagSpan from "@/shared/components/TagSpan";

export default function PostWithThumbnail({ data, className }: { data: ThumbnailPostData; className?: string }) {
  const router = useRouter();

  const moveToPost = (id: number) => {
    router.push(`/blogs/post/${id}`);
  };

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

      {/* Title */}
      <h3 className="mt-3 px-4 text-lg font-bold text-center text-black group-hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-500 group-hover:bg-gradient-to-r transition-all duration-300">
        {data.title}
      </h3>

      {/* Description */}
      <p className="hidden mobile:block px-4 mt-2 mb-4 text-sm text-gray-600 line-clamp-3 text-center">
        {data.description}
      </p>
    </motion.div>
  );
}
