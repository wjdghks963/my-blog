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

export default async function Page() {
  const [stats, recentPosts, popularPosts] = await Promise.all([
    fetchStats(),
    fetchPostsByStatus("recent"),
    fetchPostsByStatus("popular"),
  ]);

  return (
    <main className="min-h-screen pb-14">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl animate-[pulse_7s_ease-in-out_infinite]" />
        <div className="absolute top-56 -left-14 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl animate-[pulse_9s_ease-in-out_infinite]" />
      </div>

      <div className="page-shell pt-24">
        <section className="surface-card p-6 mobile:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <p className="text-brand mb-3 text-sm font-semibold uppercase tracking-[0.2em]">Junglog Studio</p>
              <h1 className="text-4xl mobile:text-5xl font-bold leading-tight">Build, Measure, Improve.</h1>
              <p className="mt-4 max-w-2xl text-muted text-lg leading-relaxed">
                백엔드 안정화부터 프론트 사용자 경험까지, 운영 지표로 성과를 증명해 온 제품 개발 기록을 남깁니다.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/blogs"
                  className="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                >
                  글 보러가기
                </Link>
                <Link
                  href="/about-me"
                  className="rounded-xl border border-soft bg-white/40 px-6 py-3 text-sm font-semibold transition-colors duration-200 hover:bg-white/70 dark:bg-transparent dark:hover:bg-white/5"
                >
                  프로필 보기
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="surface-card-soft p-4">
                  <div className="text-2xl font-bold">{stats.totalPosts}+</div>
                  <p className="text-xs text-muted">POSTS</p>
                </div>
                <div className="surface-card-soft p-4">
                  <div className="text-2xl font-bold">{stats.totalCategories}</div>
                  <p className="text-xs text-muted">CATEGORIES</p>
                </div>
                <div className="surface-card-soft p-4">
                  <div className="text-2xl font-bold">
                    {stats.totalViews >= 1000 ? `${(stats.totalViews / 1000).toFixed(1)}K+` : `${stats.totalViews}+`}
                  </div>
                  <p className="text-xs text-muted">TOTAL VIEWS</p>
                </div>
                <div className="surface-card-soft p-4">
                  <div className="text-2xl font-bold">2+</div>
                  <p className="text-xs text-muted">YEARS</p>
                </div>
              </div>

            </div>

            <aside className="flex flex-col gap-4">
              <div className="surface-card-soft p-5">
                <p className="text-xs text-muted uppercase tracking-[0.16em]">Tech Stack</p>
                <div className="mt-4">
                  <SkillSet />
                </div>
              </div>

              <div className="surface-card-soft p-5">
                <p className="text-xs text-muted uppercase tracking-[0.16em]">Quick Links</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Link
                    href="https://github.com/wjdghks963"
                    className="rounded-xl border border-soft bg-white/50 py-3 text-center text-sm font-medium transition-colors hover:bg-white dark:bg-white/5 dark:hover:bg-white/10"
                  >
                    GitHub
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/junghwan-choi-a238b1228"
                    className="rounded-xl border border-soft bg-white/50 py-3 text-center text-sm font-medium transition-colors hover:bg-white dark:bg-white/5 dark:hover:bg-white/10"
                  >
                    LinkedIn
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-12 surface-card p-6 mobile:p-8">
          <h2 className="section-title">Popular Posts</h2>
          <Suspense fallback={<PostsByStatusSkeleton count={5} />}>
            <PostsByStatus
              posts={popularPosts}
              variant="modern"
            />
          </Suspense>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.9fr_1fr]">
          <div className="surface-card p-6 mobile:p-8">
            <h2 className="section-title">Recent Posts</h2>
            <Suspense fallback={<PostsByStatusSkeleton count={5} />}>
              <PostsByStatus
                posts={recentPosts}
                variant="modern"
              />
            </Suspense>
          </div>

          <div className="surface-card p-6">
            <h3 className="section-title">Categories</h3>
            <Suspense fallback={<CategoriesBoxSkeleton />}>
              <CategoriesBox />
            </Suspense>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
