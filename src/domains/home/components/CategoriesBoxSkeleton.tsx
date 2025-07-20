"use client";

export default function CategoriesBoxSkeleton() {
  const arr = new Array(3).fill(1);

  return (
    <div className="space-y-2">
      {arr.map((_, index) => (
        <div
          key={index}
          className="backdrop-blur-md bg-white/5 dark:bg-gray-900/10 border border-white/10 dark:border-gray-700/20 rounded-2xl p-4 animate-pulse"
        >
          <div className="flex justify-between items-center mb-3">
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
            <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
