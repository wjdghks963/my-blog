"use client";

import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t-[1.5px] border-ink">
      <div className="page-shell pt-12">
        <div className="display-headline text-[14vw] font-bold leading-[0.9] mobile:text-[12vw] lg:text-[180px]">
          JUNGLOG.
        </div>

        <div className="mt-6 grid gap-6 border-t border-soft pt-6 mobile:grid-cols-3">
          <div>
            <p className="eyebrow">Site</p>
            <ul className="mt-3 space-y-2">
              <li><Link href="/" className="font-display text-sm font-bold uppercase tracking-[0.18em] hover:text-brand">Index</Link></li>
              <li><Link href="/blogs" className="font-display text-sm font-bold uppercase tracking-[0.18em] hover:text-brand">Writing</Link></li>
              <li><Link href="/about-me" className="font-display text-sm font-bold uppercase tracking-[0.18em] hover:text-brand">About</Link></li>
              <li><Link href="/update-note" className="font-display text-sm font-bold uppercase tracking-[0.18em] hover:text-brand">Notes</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="https://github.com/wjdghks963"
                  className="font-display text-sm font-bold uppercase tracking-[0.18em] hover:text-brand"
                >
                  GitHub ↗
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/junghwan-choi-a238b1228"
                  className="font-display text-sm font-bold uppercase tracking-[0.18em] hover:text-brand"
                >
                  LinkedIn ↗
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-end justify-end mobile:justify-end">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="btn-ghost"
            >
              ↑ Top
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-2 border-t-[1.5px] border-ink pt-4 pb-6 font-display text-[10px] font-bold uppercase tracking-[0.32em] text-muted">
          <span>© {new Date().getFullYear()} Junglog</span>
          <span>Practical notes for web engineering.</span>
          <span>Set in Space Grotesk · Noto Sans KR</span>
        </div>
      </div>
    </footer>
  );
}
