"use client";

import { Category } from "@types";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

function CategoryBox({ category }: { category: Category }) {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="backdrop-blur-md bg-white/5 dark:bg-gray-900/10 border border-white/10 dark:border-gray-700/20 rounded-2xl p-4 hover:bg-white/10 dark:hover:bg-gray-900/20 transition-all duration-300 mb-4"
    >
      <motion.button
        className="w-full flex justify-between items-center text-left focus:outline-none group"
        onClick={toggleDropdown}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="font-semibold text-lg text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
          {category.category}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <svg
            className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
          marginTop: open ? 16 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="space-y-2">
          {category.posts.map((post, index) => (
            <Link
              href={`/blogs/post/${post.id}`}
              key={post.id}
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group/post backdrop-blur-sm bg-white/5 dark:bg-gray-800/10 border border-white/10 dark:border-gray-600/20 rounded-xl p-3 hover:bg-white/15 dark:hover:bg-gray-800/20 hover:border-indigo-300/30 dark:hover:border-indigo-500/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-70 group-hover/post:opacity-100 transition-opacity duration-300"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover/post:text-indigo-600 dark:group-hover/post:text-indigo-400 transition-colors duration-300 line-clamp-1">
                    {post.title.length > 20 ? `${post.title.substring(0, 20)}...` : post.title}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CategoryBox;
