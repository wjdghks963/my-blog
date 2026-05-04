import React from "react";

export default function NoteList({ content }: { content: string }) {
  return (
    <li
      className="flex items-start gap-3"
      style={{
        padding: "10px 0",
        borderBottom: "1px solid var(--rule-2)",
      }}
    >
      <span
        aria-hidden
        style={{
          marginTop: 8,
          width: 6,
          height: 6,
          flexShrink: 0,
          borderRadius: "50%",
          background: "var(--accent)",
        }}
      />
      <span
        className="font-serif"
        style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-2)" }}
      >
        {content}
      </span>
    </li>
  );
}
