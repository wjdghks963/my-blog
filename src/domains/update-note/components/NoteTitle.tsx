import React from "react";

export default function NoteTitle({ year, month }: { year: string; month: string }) {
  return <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">{year}년 {month}월 업데이트</h2>;
}
