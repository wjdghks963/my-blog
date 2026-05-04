"use client";

import Link from "next/link";

export default function Certificate({
  course,
  date,
  certificateUrl,
  skills,
}: {
  course: string;
  date: string;
  certificateUrl: string;
  skills?: string[];
}) {
  return (
    <div
      className="w-full p-5"
      style={{
        background: "var(--paper-2)",
        border: "1px solid var(--rule)",
        borderRadius: 6,
      }}
    >
      <p
        className="font-serif"
        style={{ fontSize: 18, fontWeight: 500, color: "var(--ink)", margin: 0 }}
      >
        {course}
      </p>
      <p
        className="tiny-label"
        style={{ marginTop: 4, color: "var(--ink-3)", fontWeight: 500 }}
      >
        발급일 · {date}
      </p>

      {skills && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="font-mono"
              style={{
                fontSize: 10.5,
                color: "var(--ink-3)",
                padding: "2px 6px",
                border: "1px solid var(--rule)",
                borderRadius: 2,
              }}
            >
              #{skill}
            </span>
          ))}
        </div>
      )}

      <Link
        href={certificateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="tiny-label mt-4 inline-block"
        style={{
          color: "var(--ink-2)",
          borderBottom: "1px solid var(--ink-2)",
          paddingBottom: 1,
        }}
      >
        수료증 확인하기 →
      </Link>
    </div>
  );
}
