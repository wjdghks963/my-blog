import React from "react";

export default function NoteTitle({ year, month }: { year: string; month: string }) {
  return (
    <h2 className="text-2xl font-bold mb-4">
      <span
        className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent"
        style={{
          filter: "drop-shadow(0 0 10px rgba(139, 92, 246, 0.3))",
        }}
      >
        {year}년 {month}월 업데이트
      </span>
    </h2>
  );
}
