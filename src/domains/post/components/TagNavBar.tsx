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

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2">
        <TagSpan
          tag="all"
          tagName="ALL"
          clickOk={true}
          className="pill"
        />

        {tagsData.tags.map((item: { tag: string }, index: number) => (
          <TagSpan
            key={index}
            tag={item?.tag}
            clickOk={true}
            className="pill"
          />
        ))}
      </div>
    </div>
  );
}
