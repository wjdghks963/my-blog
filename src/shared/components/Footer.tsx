"use client";

import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-soft py-8">
      <div className="page-shell flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
        <p>© {new Date().getFullYear()} Junglog. Practical notes for web engineering.</p>
        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/wjdghks963"
            className="rounded-lg border border-soft px-3 py-1.5 transition-colors hover:bg-white/70 dark:hover:bg-white/10"
          >
            GitHub
          </Link>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="rounded-lg border border-soft px-3 py-1.5 transition-colors hover:bg-white/70 dark:hover:bg-white/10"
          >
            TOP
          </button>
        </div>
      </div>
    </footer>
  );
}
