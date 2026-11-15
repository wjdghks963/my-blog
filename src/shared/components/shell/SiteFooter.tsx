import React from "react";

const LINKS: { text: string; href: string }[] = [
  { text: "GitHub", href: "https://github.com/wjdghks963" },
  { text: "LinkedIn", href: "https://www.linkedin.com/in/junghwan-choi-a238b1228" },
];

export default function SiteFooter() {
  return (
    <footer
      className="shell-x flex flex-col gap-2 py-5 mobile:flex-row mobile:items-center mobile:justify-between"
      style={{
        borderTop: "1px solid var(--rule)",
        fontSize: 11.5,
        color: "var(--ink-3)",
        letterSpacing: "0.04em",
      }}
    >
      <span>© {new Date().getFullYear()} Junglog · Practical notes for web engineering</span>
      <span className="flex items-center gap-4">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {l.text}
          </a>
        ))}
        <a href="#top" className="hover:underline">
          맨 위로 ↑
        </a>
      </span>
    </footer>
  );
}
