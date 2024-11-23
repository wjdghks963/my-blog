import React from "react";

export default function NoteTitle({ year, month }: { year: string; month: string }) {
  return (
    <h2 className="text-xl font-semibold text-gray-700 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-900 transition-all duration-300">
      {year}년 {month}월 업데이트
    </h2>
  );
}
