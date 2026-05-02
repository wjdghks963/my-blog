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
    <div className="grid gap-4 border-t border-soft py-5 first:border-t-0 mobile:grid-cols-[1fr_auto] mobile:items-start">
      <div>
        <p className="font-display text-base font-bold leading-snug tracking-[-0.01em] mobile:text-lg">
          {course}
        </p>
        <p className="mt-1 font-display text-[11px] font-bold uppercase tracking-[0.24em] text-muted">
          {date}
        </p>

        {skills && (
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center border border-ink px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-[0.22em]"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      <Link
        href={certificateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-display text-[11px] font-bold uppercase tracking-[0.24em] underline underline-offset-[6px] decoration-[1.5px] hover:text-brand"
      >
        View ↗
      </Link>
    </div>
  );
}
