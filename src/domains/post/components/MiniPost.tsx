"use client";

import { PostWithId } from "@/domains/post/types";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import compareLocaleDate from "@libs/client/CompareLocaleDate";

import TagSpan from "@components/Base/TagSpan";

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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={jitter}
      onClick={() => moveToPost(data.id)}
      className="flex flex-col gap-3 w-2/3 border-solid border-black border-2 rounded-md p-5  shadow-xl cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-black dark:border-white dark:shadow-neutral-600"
    >
      <span className="font-bold font-roboto-bold">{data.title}</span>
      <span className="font-roboto-regular">{data?.description}</span>
      <span className="font-roboto-regular">{date}</span>
      <div className="hidden md:flex flex-row gap-4 ">
        {data.tags.map((tag, index, arr) => {
          if (index < 3) {
            return (
              <TagSpan
                key={index}
                tag={tag.tag}
              />
            );
          } else if (index > 3 && index < 5) {
            return (
              <TagSpan
                key={index}
                tag={tag.tag}
                className={"hidden md:flex"}
              />
            );
          } else if (index > 7 && index < 10) {
            return (
              <TagSpan
                key={index}
                tag={tag.tag}
                className={"hidden lg:flex"}
              />
            );
          }
        })}
      </div>
    </motion.div>
  );
}
