"use client";

export default function CategoriesBoxSkeleton() {
  const arr = new Array(3).fill(1);

  return (
    <div className={"flex gap-5"}>
      {arr.map((_, index) => (
        <div
          key={index}
          className={"flex flex-col w-1/5 p-2 bg-gray-200"}
        >
          <div className={"w-full h-8 bg-gray-300 animate-pulse"}></div>
        </div>
      ))}
    </div>
  );
}
