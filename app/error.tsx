"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <div className="w-full max-w-xl text-center">
        <div className="tiny-label" style={{ color: "var(--accent)", marginBottom: 14 }}>
          ERROR
        </div>
        <h1
          className="font-serif"
          style={{
            margin: 0,
            fontSize: "clamp(40px, 6vw, 64px)",
            lineHeight: 1.05,
            fontWeight: 500,
            fontStyle: "italic",
            letterSpacing: "-0.02em",
          }}
        >
          문제가 생겼어요<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p
          style={{
            margin: "20px 0 12px",
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--ink-2)",
          }}
        >
          페이지를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 다른 페이지로 이동해주세요.
        </p>

        {error?.digest && (
          <p
            className="font-mono"
            style={{ fontSize: 11, color: "var(--ink-3)", margin: "0 0 24px" }}
          >
            digest · {error.digest}
          </p>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-6">
          <button
            type="button"
            onClick={() => reset()}
            className="tiny-label"
            style={{
              color: "var(--ink)",
              borderBottom: "1px solid var(--ink)",
              paddingBottom: 1,
              background: "transparent",
            }}
          >
            다시 시도 ↻
          </button>
          <Link
            href="/"
            className="tiny-label"
            style={{
              color: "var(--ink-2)",
              borderBottom: "1px solid var(--ink-2)",
              paddingBottom: 1,
            }}
          >
            홈으로 →
          </Link>
          <Link
            href="/blogs"
            className="tiny-label"
            style={{
              color: "var(--ink-2)",
              borderBottom: "1px solid var(--ink-2)",
              paddingBottom: 1,
            }}
          >
            글 목록 →
          </Link>
        </div>
      </div>
    </main>
  );
}
