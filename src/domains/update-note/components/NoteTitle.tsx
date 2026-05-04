import React from "react";

export default function NoteTitle({ year, month }: { year: string; month: string }) {
  return (
    <div className="flex items-baseline gap-3" style={{ marginBottom: 14 }}>
      <span
        className="font-serif"
        style={{
          fontSize: 28,
          fontStyle: "italic",
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: "var(--ink)",
        }}
      >
        {year}.{month}
      </span>
      <span className="tiny-label" style={{ color: "var(--ink-3)" }}>
        Update
      </span>
    </div>
  );
}
