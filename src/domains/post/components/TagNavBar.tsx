"use client";

import TagSpan from "@shared/components/TagSpan";

interface TagNavBarProps {
  tags: { tag: string }[];
}

export default function TagNavBar({ tags }: TagNavBarProps) {
  const chip =
    "!rounded-full !border !px-2.5 !py-1 !font-mono !text-[11px] !text-[var(--ink-2)] !border-[var(--rule)] !bg-transparent hover:!bg-[var(--paper-2)]";

  return (
    <div className="flex flex-wrap gap-1.5">
      <TagSpan tag="all" tagName="#all" clickOk={true} className={chip} />
      {tags.map((item: { tag: string }, index: number) => (
        <TagSpan key={index} tag={item?.tag} tagName={`#${item?.tag}`} clickOk={true} className={chip} />
      ))}
    </div>
  );
}
