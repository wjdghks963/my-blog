"use client";

import Link from "next/link";

export default function StickyHeader() {
  const items = [
    { href: "#outcomes", label: "Outcomes" },
    { href: "#career", label: "Career" },
    { href: "#certifications", label: "Certs" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#courses", label: "Courses" },
  ];

  return (
    <aside className="sticky top-28 hidden h-fit border-l-[1.5px] border-ink pl-6 lg:block">
      <p className="eyebrow">Index</p>
      <hr className="rule-thick mt-2 mb-4" />
      <nav className="flex flex-col">
        {items.map((item, idx) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-baseline gap-3 border-b border-soft py-2.5 font-display text-sm font-bold uppercase tracking-[0.18em] hover:text-brand"
          >
            <span className="font-display text-[10px] tabular-nums text-muted">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
