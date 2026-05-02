import React from "react";

export default function NoteList({ content }: { content: string }) {
  return (
    <li className="flex items-start gap-4 border-t border-soft py-3 first:border-t-0">
      <span
        aria-hidden
        className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand"
      />
      <span className="text-base leading-relaxed text-ink">{content}</span>
    </li>
  );
}
