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
    <aside
      className="hidden h-fit lg:block"
      style={{ position: "sticky", top: 88, alignSelf: "start" }}
    >
      <div className="tiny-label" style={{ color: "var(--ink-3)", marginBottom: 12 }}>
        목차
      </div>
      <nav
        className="flex flex-col"
        style={{ borderLeft: "2px solid var(--rule)", gap: 4, fontSize: 12.5 }}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              padding: "5px 14px",
              marginLeft: -2,
              borderLeft: "2px solid transparent",
              color: "var(--ink-3)",
              lineHeight: 1.4,
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
