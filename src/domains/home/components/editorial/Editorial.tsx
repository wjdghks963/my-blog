import Link from "next/link";
import React from "react";

import { categoryColor } from "../../utils/categoryColor";

export type EditorialPost = {
  id: number;
  title: string;
  subtitle?: string;
  excerpt?: string;
  category?: string | null;
  tags: string[];
  date: string; // ISO
  read: number; // minutes
  views: number;
};

export type EditorialStats = {
  posts: number;
  categories: number;
  views: number;
  years: number;
};

function formatDate(d: string) {
  const date = new Date(d);
  return date.toLocaleDateString("ko-KR", { year: "numeric", month: "short", day: "numeric" });
}

function relDate(d: string) {
  const days = Math.floor((Date.now() - new Date(d).getTime()) / 86400000);
  if (days < 1) return "오늘";
  if (days < 7) return `${days}일 전`;
  if (days < 30) return `${Math.floor(days / 7)}주 전`;
  if (days < 365) return `${Math.floor(days / 30)}개월 전`;
  return `${Math.floor(days / 365)}년 전`;
}

function shortViews(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export function Masthead({ stats, issue }: { stats: EditorialStats; issue: string }) {
  return (
    <div
      className="px-6 mobile:px-14"
      style={{ paddingTop: 44, paddingBottom: 28, borderBottom: "2px solid var(--ink)" }}
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="tiny-label" style={{ color: "var(--accent)", marginBottom: 14 }}>
            {issue}
          </div>
          <h1
            className="font-serif"
            style={{
              margin: 0,
              fontSize: "clamp(44px, 6vw, 78px)",
              lineHeight: 0.96,
              letterSpacing: "-0.02em",
              fontWeight: 500,
              fontStyle: "italic",
              color: "var(--ink)",
            }}
          >
            어제 만든 코드,
            <br />
            오늘 읽는 기록.
          </h1>
          <p
            style={{
              margin: "20px 0 0",
              maxWidth: 520,
              fontSize: 15,
              lineHeight: 1.6,
              color: "var(--ink-2)",
            }}
          >
            운영하다 막힌 자리, 다시 짜본 구조, 한참 뒤에야 보이는 것들. 잊어버리기 전에 적어두는 작업 일지.
          </p>
        </div>

        <div
          className="font-serif grid grid-cols-4 gap-6 lg:flex lg:gap-8 lg:text-right"
          style={{ color: "var(--ink)" }}
        >
          {(
            [
              ["POSTS", `${stats.posts}+`],
              ["CATEGORIES", String(stats.categories)],
              ["VIEWS", shortViews(stats.views)],
              ["YEARS", `${stats.years}+`],
            ] as const
          ).map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 32, fontWeight: 500 }}>{v}</div>
              <div className="tiny-label" style={{ color: "var(--ink-3)", marginTop: 4 }}>
                {k}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeatureLead({ post, author = "최정환" }: { post: EditorialPost; author?: string }) {
  const color = categoryColor(post.category);
  return (
    <article className="flex flex-col">
      <div className="flex items-center gap-3" style={{ marginBottom: 18 }}>
        <span className="tiny-label" style={{ color, fontWeight: 700, letterSpacing: "0.14em" }}>
          이번 주 글
        </span>
        <span style={{ flex: 1, height: 1, background: "var(--ink)" }} />
        <span className="tiny-label" style={{ color: "var(--ink-3)" }}>
          No. {String(post.id).padStart(3, "0")}
        </span>
      </div>

      <div className="flex items-center gap-2.5" style={{ marginBottom: 14 }}>
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: color,
          }}
        />
        <span className="tiny-label" style={{ color, fontWeight: 700 }}>
          {post.category ?? "기록"}
        </span>
        {post.tags.slice(0, 2).map((t) => (
          <span
            key={t}
            className="font-mono"
            style={{ fontSize: 10.5, color: "var(--ink-3)" }}
          >
            #{t}
          </span>
        ))}
      </div>

      <Link href={`/blogs/post/${post.id}`} className="group">
        <h2
          className="font-serif group-hover:underline"
          style={{
            margin: "0 0 14px",
            fontSize: "clamp(30px, 3.6vw, 46px)",
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            fontWeight: 500,
            color: "var(--ink)",
            textDecorationThickness: 1,
          }}
        >
          {post.title}
        </h2>
      </Link>

      {post.subtitle && (
        <p
          className="font-serif"
          style={{
            margin: "0 0 22px",
            fontSize: 19,
            lineHeight: 1.45,
            color: "var(--ink-2)",
            fontStyle: "italic",
            fontWeight: 300,
          }}
        >
          {post.subtitle}
        </p>
      )}

      {post.excerpt && (
        <p style={{ margin: "0 0 22px", fontSize: 14.5, lineHeight: 1.7, color: "var(--ink-2)" }}>
          {post.excerpt}
        </p>
      )}

      <div
        className="flex items-center gap-2.5"
        style={{
          fontSize: 12,
          color: "var(--ink-3)",
          paddingTop: 16,
          borderTop: "1px solid var(--rule-2)",
        }}
      >
        <span style={{ color: "var(--ink-2)", fontWeight: 500 }}>{author}</span>
        <span>·</span>
        <span>{formatDate(post.date)}</span>
        <span>·</span>
        <span>{post.read}분 읽기</span>
        <span className="font-mono" style={{ marginLeft: "auto", fontSize: 11 }}>
          {post.views.toLocaleString()} views
        </span>
      </div>
    </article>
  );
}

export function FeatureSide({ post }: { post: EditorialPost }) {
  const color = categoryColor(post.category);
  return (
    <article style={{ borderLeft: "1px solid var(--rule)", paddingLeft: 24 }}>
      <span className="tiny-label" style={{ color, fontWeight: 600 }}>
        {post.category ?? "기록"}
      </span>
      <Link href={`/blogs/post/${post.id}`} className="group block">
        <h3
          className="font-serif group-hover:underline"
          style={{
            margin: "10px 0 8px",
            fontSize: 22,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            fontWeight: 500,
            color: "var(--ink)",
          }}
        >
          {post.title}
        </h3>
      </Link>
      {post.excerpt && (
        <p style={{ margin: "0 0 10px", fontSize: 13, lineHeight: 1.55, color: "var(--ink-2)" }}>
          {post.excerpt}
        </p>
      )}
      <div style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.04em" }}>
        {formatDate(post.date)} · {post.read}분
      </div>
    </article>
  );
}

export function ListItemEditorial({ post, num }: { post: EditorialPost; num: number }) {
  const color = categoryColor(post.category);
  return (
    <article
      className="grid gap-4"
      style={{
        gridTemplateColumns: "32px 1fr",
        padding: "20px 0",
        borderBottom: "1px solid var(--rule-2)",
      }}
    >
      <div
        className="font-serif"
        style={{ fontSize: 22, color: "var(--ink-4)", fontStyle: "italic" }}
      >
        {String(num).padStart(2, "0")}
      </div>
      <div>
        <div className="flex items-center gap-2.5" style={{ marginBottom: 8 }}>
          <span className="tiny-label" style={{ color, fontWeight: 600 }}>
            {post.category ?? "기록"}
          </span>
          <span style={{ color: "var(--ink-4)" }}>·</span>
          <span className="tiny-label" style={{ color: "var(--ink-3)" }}>
            {relDate(post.date)}
          </span>
        </div>
        <Link href={`/blogs/post/${post.id}`} className="group block">
          <h3
            className="font-serif group-hover:underline"
            style={{
              margin: "0 0 6px",
              fontSize: 19,
              lineHeight: 1.2,
              fontWeight: 500,
              color: "var(--ink)",
            }}
          >
            {post.title}
          </h3>
        </Link>
        {post.subtitle && (
          <p style={{ margin: "0 0 10px", fontSize: 13, lineHeight: 1.55, color: "var(--ink-2)" }}>
            {post.subtitle}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-1.5">
          {post.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="font-mono"
              style={{
                fontSize: 10.5,
                color: "var(--ink-3)",
                padding: "2px 6px",
                border: "1px solid var(--rule)",
                borderRadius: 2,
              }}
            >
              #{t}
            </span>
          ))}
          <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--ink-3)" }}>
            {post.views.toLocaleString()} views · {post.read}분
          </span>
        </div>
      </div>
    </article>
  );
}

export function SectionHeader({
  title,
  subtitle,
  href,
  ctaLabel = "모두 보기 →",
}: {
  title: string;
  subtitle?: string;
  href?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-6" style={{ marginBottom: 24 }}>
      <div>
        <h2
          className="font-serif"
          style={{
            margin: 0,
            fontSize: 28,
            fontWeight: 500,
            fontStyle: "italic",
            letterSpacing: "-0.01em",
            color: "var(--ink)",
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <div className="tiny-label" style={{ color: "var(--ink-3)", marginTop: 2 }}>
            {subtitle}
          </div>
        )}
      </div>
      <div style={{ flex: 1, height: 1, background: "var(--ink)", margin: "0 24px" }} />
      {href && (
        <Link
          href={href}
          className="tiny-label"
          style={{
            color: "var(--ink-2)",
            borderBottom: "1px solid var(--ink-2)",
            paddingBottom: 1,
          }}
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}

export function FooterStrip() {
  return (
    <div
      className="flex flex-col gap-2 px-6 py-5 mobile:flex-row mobile:items-center mobile:justify-between mobile:px-14"
      style={{
        borderTop: "1px solid var(--rule)",
        fontSize: 11.5,
        color: "var(--ink-3)",
        letterSpacing: "0.04em",
      }}
    >
      <span>© {new Date().getFullYear()} Junglog · Practical notes for web engineering</span>
      <span>RSS · GitHub · LinkedIn</span>
    </div>
  );
}
