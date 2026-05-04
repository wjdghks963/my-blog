import {
  EditorialPost,
  EditorialStats,
  FeatureLead,
  FeatureSide,
  FooterStrip,
  ListItemEditorial,
  Masthead,
  SectionHeader,
} from "@domains/home/components/editorial/Editorial";
import React from "react";

import prismaclient from "@libs/server/prismaClient";

export const revalidate = 60;

const WORDS_PER_MINUTE = 350;

function readMinutes(content: string) {
  const len = content?.length ?? 0;
  return Math.max(1, Math.round(len / WORDS_PER_MINUTE));
}

function plainExcerpt(content: string, max = 180) {
  if (!content) return "";
  const stripped = content
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`~\-]/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return stripped.length > max ? `${stripped.slice(0, max).trim()}…` : stripped;
}

async function fetchHomeData() {
  try {
    const [stats, recent] = await Promise.all([
      Promise.all([
        prismaclient.post.aggregate({ _sum: { views: true } }),
        prismaclient.post.count(),
        prismaclient.category.count(),
      ]),
      prismaclient.post.findMany({
        take: 11,
        orderBy: { createdAt: "desc" },
        include: {
          category: { select: { category: true } },
          tags: { include: { tag: true } },
        },
      }),
    ]);

    const editorialPosts: EditorialPost[] = recent.map((p) => ({
      id: p.id,
      title: p.title,
      subtitle: undefined,
      excerpt: plainExcerpt(p.description || p.content),
      category: p.category?.category ?? null,
      tags: p.tags.map((pt) => pt.tag.tag),
      date: p.createdAt.toISOString(),
      read: readMinutes(p.content),
      views: p.views ?? 0,
    }));

    const editorialStats: EditorialStats = {
      posts: stats[1],
      categories: stats[2],
      views: stats[0]._sum.views || 0,
      years: Math.max(1, new Date().getFullYear() - 2024 + 1),
    };

    return { posts: editorialPosts, stats: editorialStats };
  } catch {
    return {
      posts: [] as EditorialPost[],
      stats: { posts: 0, categories: 0, views: 0, years: 1 } as EditorialStats,
    };
  }
}

function issueLabel(date = new Date()) {
  const start = new Date(2024, 0, 1).getTime();
  const weeks = Math.max(1, Math.floor((date.getTime() - start) / (7 * 86400000)));
  const vol = String(Math.floor(weeks / 52) + 1).padStart(2, "0");
  const issue = String((weeks % 52) + 1).padStart(2, "0");
  const today = date.toLocaleDateString("ko-KR", { year: "numeric", month: "short", day: "numeric" });
  return `Vol. ${vol} · Issue ${issue} · ${today}`;
}

export default async function Page() {
  const { posts, stats } = await fetchHomeData();

  const lead = posts[0];
  const sideA = posts[1];
  const sideB = posts[2];
  const recent = posts.slice(3, 11);

  return (
    <main className="min-h-screen" style={{ background: "var(--paper)", color: "var(--ink)" }}>
      <Masthead stats={stats} issue={issueLabel()} />

      {lead && (
        <div
          className="grid gap-8 px-6 mobile:px-14 lg:grid-cols-[2fr_1fr_1fr]"
          style={{ paddingTop: 32, paddingBottom: 32, borderBottom: "1px solid var(--rule)" }}
        >
          <FeatureLead post={lead} />
          {sideA && <FeatureSide post={sideA} />}
          {sideB && <FeatureSide post={sideB} />}
        </div>
      )}

      {recent.length > 0 && (
        <div className="px-6 mobile:px-14" style={{ paddingTop: 32, paddingBottom: 48 }}>
          <SectionHeader title="Recent" subtitle="최근 작성한 글" href="/blogs" />
          <div
            className="grid gap-x-12"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
          >
            {recent.map((p, i) => (
              <ListItemEditorial key={p.id} post={p} num={i + 4} />
            ))}
          </div>
        </div>
      )}

      <FooterStrip />
    </main>
  );
}
