import { cls } from "@libs/client/utils";
import { useRouter } from "next/router";
import { category } from "pages";
import React, { useState } from "react";

export function CategoryBox({ category }: { category: category }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const goToPost = (id: number) => {
    return router.push(`blogs/post/${id}`);
  };

  return (
    <div className="" onClick={() => setOpen((prev) => !prev)}>
      <span className="font-bold text-lg cursor-pointer flex justify-between items-center">
        {category.category}
        {open ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
            ></path>
          </svg>
        )}
      </span>
      <div
        className={cls(
          "transition-all duration-300 flex flex-col mt-3",
          open ? "flex translate-y-2 h-auto" : "-translate-y-10 opacity-0 h-20"
        )}
      >
        {category.posts.map((post) => (
          <span
            className="border-black border-2 rounded-md text-center cursor-pointer p-2 mb-3 break-words"
            key={post.id}
            onClick={() => (open ? goToPost(post.id) : null)}
          >
            {post.title.substring(0, 10)}
          </span>
        ))}
      </div>
    </div>
  );
}
