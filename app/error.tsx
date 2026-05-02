"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-20">
      <div className="page-shell">
        <div className="border-y-[1.5px] border-ink py-10">
          <span className="eyebrow">Stop press · Error</span>
          <h1 className="mt-4 display-headline text-5xl mobile:text-7xl">
            Something
            <br />
            <span className="marker-highlight">went wrong.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-ink-soft">
            페이지를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 다른 페이지로 이동해주세요.
          </p>

          {error?.digest ? (
            <p className="mt-3 font-display text-[11px] font-bold uppercase tracking-[0.28em] text-muted">
              Error code:{" "}
              <code className="border border-soft bg-paper-soft px-1.5 py-0.5">{error.digest}</code>
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="btn-ink"
            >
              Try again
            </button>
            <Link
              href="/"
              className="btn-ghost"
            >
              Index
            </Link>
            <Link
              href="/blogs"
              className="btn-ghost"
            >
              Archive
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
