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
  skills?: string[]; // 추가된 기술 스택 배열
}) {
  return (
    <div className="surface-card-soft w-full rounded-xl p-5">
      <p className="text-lg font-semibold text-[var(--text-primary)]">{course} 과정</p>
      <p className="mt-1 text-sm text-muted">발급일: {date}</p>

      {skills && (
        <div className="mt-3 flex flex-wrap gap-2">
          {skills?.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-soft bg-[var(--bg-soft)] px-3 py-1 text-sm font-medium text-[var(--text-primary)]"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      <Link
        href={certificateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:brightness-110"
      >
        수료증 확인하기
      </Link>
    </div>
  );
}
