"use client";

import { FooterStrip } from "@domains/home/components/editorial/Editorial";
import dynamic from "next/dynamic";

const ThreeDModel = dynamic(() => import("@domains/3d/components/ThreeDModel"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <div
          className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full"
          style={{ borderBottom: "2px solid var(--accent)" }}
        />
        <p style={{ color: "var(--ink-3)" }} className="font-mono text-sm">
          3D 모델 로딩 중…
        </p>
      </div>
    </div>
  ),
});

export default function ThreeDSpacePage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <header
        className="px-6 mobile:px-14"
        style={{
          paddingTop: 44,
          paddingBottom: 28,
          borderBottom: "2px solid var(--ink)",
        }}
      >
        <div className="tiny-label" style={{ color: "var(--accent)", marginBottom: 14 }}>
          INTERACTIVE
        </div>
        <h1
          className="font-serif"
          style={{
            margin: 0,
            fontSize: "clamp(40px, 6vw, 64px)",
            lineHeight: 1,
            fontWeight: 500,
            fontStyle: "italic",
            letterSpacing: "-0.02em",
          }}
        >
          3D Space<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p
          style={{
            margin: "14px 0 0",
            maxWidth: 580,
            fontSize: 14.5,
            lineHeight: 1.6,
            color: "var(--ink-2)",
          }}
        >
          마우스로 드래그해 회전, 스크롤로 확대/축소.
        </p>
      </header>

      <section className="px-6 mobile:px-14" style={{ paddingTop: 32, paddingBottom: 48 }}>
        <div
          className="h-[78vh] w-full overflow-hidden"
          style={{
            border: "1px solid var(--rule)",
            borderRadius: 6,
            background: "var(--paper-2)",
          }}
        >
          <ThreeDModel />
        </div>
      </section>

      <FooterStrip />
    </main>
  );
}
