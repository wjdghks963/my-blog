import React from "react";

export default function NoteTitle({ year, month }: { year: string; month: string }) {
  return (
    <h2 className="font-display text-3xl font-bold tabular-nums leading-none tracking-[-0.02em] mobile:text-4xl">
      {year}
      <span className="text-brand">.</span>
      {month}
    </h2>
  );
}
