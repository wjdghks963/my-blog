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
    <div className="hidden sm:flex flex-row gap-5 w-3/4 mx-auto mt-10 px-5 py-3 rounded-md overflow-x-scroll scrollbar-hide border-black border-2 dark:border-white shadow-slate-500 shadow-md">
      <TagSpan
        tag="all"
        tagName="ALL"
        clickOk={true}
      />
      {tagsData.tags.map((item: { tag: string }, index: number) => (
        <TagSpan
          key={index}
          tag={item?.tag}
          clickOk={true}
        />
      ))}
    </div>
  );
}
