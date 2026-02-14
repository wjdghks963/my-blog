import React from "react";

export default function NoteLists({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-2 text-[var(--text-primary)]">{children}</ul>;
}
