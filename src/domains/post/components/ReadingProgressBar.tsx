"use client";

import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: 2,
        background: "var(--rule-2)",
        zIndex: 4,
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: "var(--accent)",
          transition: "width 80ms linear",
        }}
      />
    </div>
  );
}
