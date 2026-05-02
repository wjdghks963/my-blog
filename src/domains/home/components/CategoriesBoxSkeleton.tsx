"use client";

export default function CategoriesBoxSkeleton() {
  const arr = new Array(3).fill(1);

  return (
    <div className="divide-y divide-[var(--line-soft)] border-b border-[var(--line-soft)]">
      {arr.map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-3"
        >
          <div className="h-4 w-32 animate-pulse bg-paper-soft" />
          <div className="h-3 w-8 animate-pulse bg-paper-soft" />
        </div>
      ))}
    </div>
  );
}
