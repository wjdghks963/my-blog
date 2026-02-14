"use client";

import Link from "next/link";

export default function StickyHeader() {
  const items = [
    { href: "#outcomes", label: "주요 성과" },
    { href: "#career", label: "경력" },
    { href: "#certifications", label: "자격증" },
    { href: "#skills", label: "기술스택" },
    { href: "#projects", label: "프로젝트" },
    { href: "#courses", label: "수료증" },
  ];

  return (
    <aside className="sticky top-24 hidden h-fit rounded-xl border border-soft bg-[var(--bg-elevated)] p-5 shadow-md backdrop-blur lg:block">
      <h2 className="mb-3 text-lg font-bold text-[var(--text-primary)]">About Me</h2>
      <nav className="flex flex-col gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-soft)]"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
