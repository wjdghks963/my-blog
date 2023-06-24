"use client";

import { Category } from "@types";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export function CategoryBox({ category }: { category: Category }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const goToPost = (id: number) => {
    return router.push(`blogs/post/${id}`);
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1, rotateZ: 360 }}
    >
      <motion.span
        className="font-bold text-lg cursor-pointer flex justify-between items-center"
        onClick={toggleDropdown}
      >
        {category.category}
        <motion.svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.span>
      <motion.div
        className="flex flex-col mt-3"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
      >
        {" "}
        {category.posts.map((post) => (
          <motion.span
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.03 }}
            className="border-black border-2 rounded-md text-center cursor-pointer p-2 mb-3 break-words dark:border-white"
            key={post.id}
            onClick={() => goToPost(post.id)}
          >
            {post.title.length > 15 ? `${post.title.substring(0, 15)}..` : post.title}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
