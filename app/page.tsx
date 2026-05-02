import CategoriesBox from "@domains/home/components/CategoriesBox";
import CategoriesBoxSkeleton from "@domains/home/components/CategoriesBoxSkeleton";
import PostsByStatus from "@domains/home/components/PostsByStatus";
import PostsByStatusSkeleton from "@domains/home/components/PostsByStatusSkeleton";
import Footer from "@shared/components/Footer";
import SkillSet from "@shared/components/SkillSet";
import { ThumbnailPostData } from "@types";
import Link from "next/link";
import React, { Suspense } from "react";

import { RegImageSrc } from "@libs/server/RegImageSrc";
import prismaclient from "@libs/server/prismaClient";

export const revalidate = 60;

async function fetchStats() {
  try {
    const [views, totalPosts, totalCategories] = await Promise.all([
      prismaclient.post.aggregate({
        _sum: {
          views: true,
        },
      }),
      prismaclient.post.count(),
      prismaclient.category.count(),
    ]);

    return {
      totalViews: views._sum.views || 0,
      totalPosts,
      totalCategories,
    };
  } catch (error) {
    // ignore
  }

  return {
    totalViews: 0,
    totalPosts: 0,
    totalCategories: 0,
  };
}

async function fetchPostsByStatus(status: "recent" | "popular") {
  try {
    const posts = await prismaclient.post.findMany({
      take: 5,
      orderBy: status === "popular" ? { views: "desc" } : { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        views: true,
      },
    });

    const postsJson: ThumbnailPostData[] = posts.map((post) => {
      const thumbnailFromContent = RegImageSrc(post.content);
      return {
        id: post.id,
        title: post.title,
        description: post.description,
        thumbnail: thumbnailFromContent || undefined,
        views: post.views,
      };
    });

    return postsJson;
  } catch (error) {
    return [];
  }
}

function formatViews(value: number) {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return `${value}`;
}

export default async function Page() {
  const [stats, recentPosts, popularPosts] = await Promise.all([
    fetchStats(),
    fetchPostsByStatus("recent"),
    fetchPostsByStatus("popular"),
  ]);

  const issueDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen pb-16">
      {/* MASTHEAD */}
      <section className="border-b-[1.5px] border-ink">
        <div className="page-shell pt-10 mobile:pt-14">
          <div className="flex items-baseline justify-between">
            <span className="eyebrow">Issue №04</span>
            <span className="eyebrow hidden mobile:inline">{issueDate}</span>
            <span className="eyebrow">{stats.totalPosts} entries</span>
          </div>

          <hr className="rule-thick mt-3" />

          <div className="grid gap-8 pt-8 mobile:pt-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <h1 className="display-headline text-[44px] leading-[0.92] mobile:text-[88px] lg:text-[112px]">
                BUILD,
                <br />
                <span className="marker-highlight">MEASURE,</span>
                <br />
                IMPROVE.
              </h1>

              <p className="mt-8 max-w-xl font-display text-base text-ink-soft lg:text-lg">
                서비스 안정성과 운영 지표로 성과를 증명해 온 제품 개발 기록.
                프론트엔드부터 인프라까지, 만든 것 · 측정한 것 · 고친 것을 남깁니다.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/blogs"
                  className="btn-ink"
                >
                  Read the index →
                </Link>
                <Link
                  href="/about-me"
                  className="btn-ghost"
                >
                  Colophon
                </Link>
              </div>
            </div>

            <aside className="flex flex-col justify-end lg:col-span-4">
              <dl className="grid grid-cols-3 gap-0 border-y-[1.5px] border-ink">
                <div className="border-r border-soft px-4 py-5">
                  <dt className="eyebrow">Posts</dt>
                  <dd className="mt-2 font-display text-3xl font-bold tabular-nums">
                    {String(stats.totalPosts).padStart(2, "0")}
                  </dd>
                </div>
                <div className="border-r border-soft px-4 py-5">
                  <dt className="eyebrow">Topics</dt>
                  <dd className="mt-2 font-display text-3xl font-bold tabular-nums">
                    {String(stats.totalCategories).padStart(2, "0")}
                  </dd>
                </div>
                <div className="px-4 py-5">
                  <dt className="eyebrow">Reads</dt>
                  <dd className="mt-2 font-display text-3xl font-bold tabular-nums">{formatViews(stats.totalViews)}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* MOST READ */}
      <section className="border-b border-soft">
        <div className="page-shell pt-12">
          <div className="flex items-end justify-between gap-4 pb-4">
            <div>
              <span className="eyebrow">Section A</span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.02em] mobile:text-4xl">Most Read</h2>
            </div>
            <Link
              href="/blogs"
              className="font-display text-xs font-bold uppercase tracking-[0.22em] underline underline-offset-[6px] decoration-[1.5px]"
            >
              See all
            </Link>
          </div>
          <hr className="rule-thick mb-2" />

          <Suspense fallback={<PostsByStatusSkeleton count={5} />}>
            <PostsByStatus
              posts={popularPosts}
              variant="modern"
            />
          </Suspense>
        </div>
      </section>

      {/* RECENT + CATEGORIES */}
      <section className="border-b border-soft">
        <div className="page-shell grid gap-12 pt-12 lg:grid-cols-[1.7fr_1fr]">
          <div>
            <div className="flex items-end justify-between gap-4 pb-4">
              <div>
                <span className="eyebrow">Section B</span>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.02em] mobile:text-4xl">Latest</h2>
              </div>
              <Link
                href="/blogs"
                className="font-display text-xs font-bold uppercase tracking-[0.22em] underline underline-offset-[6px] decoration-[1.5px]"
              >
                Archive
              </Link>
            </div>
            <hr className="rule-thick" />
            <Suspense fallback={<PostsByStatusSkeleton count={5} />}>
              <PostsByStatus
                posts={recentPosts}
                variant="index"
              />
            </Suspense>
          </div>

          <aside className="border-l border-soft pl-6 lg:pl-10">
            <div className="pb-4">
              <span className="eyebrow">Section C</span>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.02em] mobile:text-3xl">Topics</h2>
            </div>
            <hr className="rule-thick mb-2" />
            <Suspense fallback={<CategoriesBoxSkeleton />}>
              <CategoriesBox />
            </Suspense>

            <div className="mt-10 pb-4">
              <span className="eyebrow">Section D</span>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.02em] mobile:text-3xl">Stack</h2>
            </div>
            <hr className="rule-thick mb-4" />
            <SkillSet />

            <div className="mt-10">
              <hr className="rule-thick mb-4" />
              <div className="flex flex-col gap-2">
                <Link
                  href="https://github.com/wjdghks963"
                  className="flex items-center justify-between border-b border-soft py-3 font-display text-sm font-bold uppercase tracking-[0.22em]"
                >
                  <span>GitHub</span>
                  <span aria-hidden>↗</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/junghwan-choi-a238b1228"
                  className="flex items-center justify-between border-b border-soft py-3 font-display text-sm font-bold uppercase tracking-[0.22em]"
                >
                  <span>LinkedIn</span>
                  <span aria-hidden>↗</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
