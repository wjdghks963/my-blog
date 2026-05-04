"use client";

import { tagQueryKeys } from "@domains/post/services/post.service";
import TagSpan from "@shared/components/TagSpan";
import { httpService } from "@shared/services/http.service";
import { useSuspenseQuery } from "@tanstack/react-query";

interface TagsData {
  tags: { tag: string }[];
}

async function fetchTags() {
  return httpService.get<TagsData>(`/api/blogs/tags`);
}

export default function TagNavBar() {
  const { data: tagsData } = useSuspenseQuery<TagsData>({
    queryKey: tagQueryKeys.all,
    queryFn: fetchTags,
    staleTime: Infinity,
  });

  const chip =
    "!rounded-full !border !px-2.5 !py-1 !font-mono !text-[11px] !text-[var(--ink-2)] !border-[var(--rule)] !bg-transparent hover:!bg-[var(--paper-2)]";

  return (
    <div className="flex flex-wrap gap-1.5">
      <TagSpan tag="all" tagName="#all" clickOk={true} className={chip} />
      {tagsData.tags.map((item: { tag: string }, index: number) => (
        <TagSpan key={index} tag={item?.tag} tagName={`#${item?.tag}`} clickOk={true} className={chip} />
      ))}
    </div>
  );
}
