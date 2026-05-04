const MAP: Record<string, string> = {
  회고록: "var(--accent)",
  retrospective: "var(--accent)",
  JavaScript: "var(--accent-3)",
  TypeScript: "var(--accent-3)",
  React: "var(--accent-6)",
  "Next.js": "var(--accent-6)",
  Java: "var(--accent-2)",
  Spring: "var(--accent-2)",
  Backend: "var(--accent-2)",
  AWS: "var(--accent-4)",
  OS: "var(--accent-5)",
  DB: "#7a4f2e",
  DevOps: "#3d6f7a",
};

export function categoryColor(name?: string | null): string {
  if (!name) return "var(--accent)";
  return MAP[name] ?? "var(--accent)";
}
