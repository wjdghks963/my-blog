export default function TagNavBarSkeleton() {
  return (
    <div className="w-full">
      <div className="text-2xl font-bold mb-6 text-center">
        <div className="w-16 h-8 mx-auto bg-gradient-to-r from-violet-300/50 to-purple-300/50 dark:from-violet-500/30 dark:to-purple-500/30 rounded-lg animate-pulse"></div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="backdrop-blur-sm bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-600/30 rounded-xl px-4 py-2 animate-pulse"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div
              className="bg-gray-300/60 dark:bg-gray-600/60 rounded-md"
              style={{
                width: `${Math.random() * 40 + 40}px`,
                height: "16px",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
