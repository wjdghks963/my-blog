"use client";

import { useEffect, useMemo, useState } from "react";

const CODE_BLOCK = /```[\s\S]*?```/g;

type Item = { level: number; anchor: string; title: string };

function extractToc(markdown: string): Item[] {
  const src = markdown.replace(CODE_BLOCK, "");
  const re = /^\s*(#{1,3})\s*(.+)$/gm;
  const out: Item[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const level = m[1].length;
    const title = m[2].trim();
    const anchor = title
      .replace(/\.\s+/g, "-")
      .replace(/[^a-zA-Z0-9가-힣\s-]/g, "")
      .replace(/ /g, "-")
      .toLowerCase();
    out.push({ level, anchor, title });
  }
  return out;
}

export default function EditorialToc({ markdown }: { markdown: string }) {
  const toc = useMemo(() => extractToc(markdown), [markdown]);
  const [active, setActive] = useState<string | null>(toc[0]?.anchor ?? null);

  useEffect(() => {
    if (toc.length === 0) return;
    const els = toc
      .map((t) => document.getElementById(t.anchor))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: [0, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <aside style={{ alignSelf: "start", position: "sticky", top: 88 }}>
      <div className="tiny-label" style={{ color: "var(--ink-3)", marginBottom: 12 }}>
        목차
      </div>
      <nav
        style={{
          borderLeft: "2px solid var(--rule)",
          display: "grid",
          gap: 4,
          fontSize: 12.5,
        }}
      >
        {toc.map((t) => {
          const isActive = active === t.anchor;
          return (
            <a
              key={t.anchor}
              href={`#${t.anchor}`}
              style={{
                padding: "5px 14px",
                marginLeft: -2,
                borderLeft: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                color: isActive ? "var(--ink)" : "var(--ink-3)",
                fontWeight: isActive ? 600 : 400,
                lineHeight: 1.4,
                paddingLeft: 14 + (t.level - 1) * 10,
              }}
            >
              {t.title}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
