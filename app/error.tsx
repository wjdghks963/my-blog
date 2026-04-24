"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-20">
      <div className="w-full max-w-xl text-center">
        <div className="surface-card p-8 mobile:p-12">
          <p className="text-brand mb-3 text-sm font-semibold uppercase tracking-[0.2em]">Oops</p>
          <h1 className="text-4xl mobile:text-5xl font-bold leading-tight text-[var(--text-primary)]">
            문제가 발생했어요
          </h1>
          <p className="mt-4 text-muted leading-relaxed">
            페이지를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 다른 페이지로 이동해주세요.
          </p>

          {error?.digest ? (
            <p className="mt-4 text-xs text-muted">
              오류 코드: <code className="rounded bg-slate-200/60 px-1.5 py-0.5 dark:bg-slate-700/50">{error.digest}</code>
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              다시 시도
            </button>
            <Link
              href="/"
              className="rounded-xl border border-soft bg-white/40 px-6 py-3 text-sm font-semibold transition-colors duration-200 hover:bg-white/70 dark:bg-transparent dark:hover:bg-white/5"
            >
              홈으로 이동
            </Link>
            <Link
              href="/blogs"
              className="rounded-xl border border-soft bg-white/40 px-6 py-3 text-sm font-semibold transition-colors duration-200 hover:bg-white/70 dark:bg-transparent dark:hover:bg-white/5"
            >
              글 목록 보기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
