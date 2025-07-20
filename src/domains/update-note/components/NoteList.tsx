import React from "react";

export default function NoteList({ content }: { content: string }) {
  return (
    <li className="flex items-start space-x-3 py-2 px-4 rounded-xl backdrop-blur-sm bg-white/5 dark:bg-gray-800/10 border border-white/10 dark:border-gray-700/20 hover:bg-white/10 dark:hover:bg-gray-800/20 transition-all duration-200">
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mt-2 flex-shrink-0"></div>
      <span className="leading-relaxed text-sm">{content}</span>
    </li>
  );
}
