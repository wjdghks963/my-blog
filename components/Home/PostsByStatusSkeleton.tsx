"use client";

import { cls } from "@libs/client/utils";

export default function PostsByStatusSkeleton({ count }: { count: number }) {
  const arr = new Array(count).fill(1);

  return (
    <div className={"flex gap-5"}>
      {arr.map((_, index) => (
        <div
          key={index}
          className={cls(index === 4 ? "hidden mobile:flex" : "", "flex flex-col w-1/5 p-2 bg-gray-200")}
        >
          <span className={"font-semibold py-3 bg-gray-300 animate-pulse mb-1"} />
          <div className={"w-full h-32 bg-gray-300 animate-pulse"}></div>
          <span className={"py-2 text-center bg-gray-300 animate-pulse mt-1"} />
        </div>
      ))}
    </div>
  );
}
