"use client";

export default function PostsByStatusSkeleton({ count }: { count: number }) {
  const arr = new Array(count).fill(1);

  return (
    <div className="divide-y divide-[var(--line-soft)] border-b border-[var(--line-soft)]">
      {arr.map((_, index) => (
        <div
          key={index}
          className="grid items-center gap-4 py-5"
          style={{ gridTemplateColumns: "56px 1fr 80px" }}
        >
          <div className="h-5 w-8 animate-pulse bg-paper-soft" />
          <div className="space-y-2">
            <div className="h-4 w-3/4 animate-pulse bg-paper-soft" />
            <div className="h-3 w-1/2 animate-pulse bg-paper-soft" />
          </div>
          <div className="h-3 animate-pulse bg-paper-soft" />
        </div>
      ))}
    </div>
  );
}
