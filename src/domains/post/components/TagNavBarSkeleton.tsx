export default function TagNavBarSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="h-7 w-20 animate-pulse border border-soft bg-paper-soft"
          style={{
            width: `${Math.random() * 40 + 60}px`,
            animationDelay: `${index * 80}ms`,
          }}
        />
      ))}
    </div>
  );
}
