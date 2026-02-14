import React from "react";

export default function NoteList({ content }: { content: string }) {
  return (
    <li className="flex items-start space-x-3 rounded-lg border border-soft bg-white/60 px-4 py-2.5 transition-colors duration-200 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10">
      <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--accent-primary)]" />
      <span className="text-sm leading-relaxed text-[var(--text-primary)]">{content}</span>
    </li>
  );
}
