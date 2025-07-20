"use client";

import TagSpan from "@shared/components/TagSpan";
import { useSuspenseQuery } from "@tanstack/react-query";

interface TagsData {
  tags: { tag: string }[];
}

async function fetchTags() {
  const res = await fetch(`/api/blogs/tags`);
  if (!res.ok) {
    throw new Error(`Failed to fetch tags: ${res.status}`);
  }
  return res.json();
}

export default function TagNavBar() {
  const { data: tagsData } = useSuspenseQuery<TagsData>({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: Infinity,
  });

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold mb-6 text-center">
        <span
          className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent"
          style={{
            filter: "drop-shadow(0 0 15px rgba(139, 92, 246, 0.3))",
          }}
        >
          Tags
        </span>
      </h3>

      <div className="flex flex-wrap gap-3 justify-center">
        <TagSpan
          tag="all"
          tagName="ALL"
          clickOk={true}
          className="!bg-white/10 dark:!bg-gray-800/20 !border-2 !border-gray-300 dark:!border-gray-600 hover:!border-black dark:hover:!border-white transition-all duration-300"
        />

        {tagsData.tags.map((item: { tag: string }, index: number) => (
          <TagSpan
            key={index}
            tag={item?.tag}
            clickOk={true}
            className="!bg-white/10 dark:!bg-gray-800/20 !border-2 !border-gray-300 dark:!border-gray-600 hover:!border-black dark:hover:!border-white transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
}
