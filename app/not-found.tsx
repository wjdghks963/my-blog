import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-6 text-center"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <div className="tiny-label" style={{ color: "var(--accent)", marginBottom: 14 }}>
        ERROR · 404
      </div>
      <h1
        className="font-serif"
        style={{
          margin: 0,
          fontSize: "clamp(64px, 10vw, 120px)",
          lineHeight: 1,
          fontWeight: 500,
          fontStyle: "italic",
          letterSpacing: "-0.02em",
        }}
      >
        Not Found<span style={{ color: "var(--accent)" }}>.</span>
      </h1>
      <p
        style={{
          margin: "20px 0 28px",
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--ink-2)",
          maxWidth: 480,
        }}
      >
        찾으시는 페이지나 글이 존재하지 않습니다. 메인이나 글 목록으로 돌아가 보세요.
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        <Link
          href="/"
          className="tiny-label"
          style={{
            color: "var(--ink)",
            borderBottom: "1px solid var(--ink)",
            paddingBottom: 1,
          }}
        >
          메인으로 →
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
    </main>
  );
}
