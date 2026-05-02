import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-20">
      <div className="page-shell">
        <div className="border-y-[1.5px] border-ink py-10">
          <span className="eyebrow">Page № 404</span>
          <h1 className="mt-4 display-headline text-[28vw] leading-[0.85] mobile:text-[200px]">
            404.
          </h1>
          <p className="mt-2 font-display text-lg font-bold uppercase tracking-[-0.01em] mobile:text-2xl">
            찾으시는 포스트가 존재하지 않습니다.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="btn-ink"
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
