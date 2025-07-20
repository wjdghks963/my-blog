"use client";

import React, { useRef, useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { setSearchQuery } from "@store/modules/searchQuery";
import { setFilterTag } from "@store/modules/tagFilter";

export function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const filterQuery = useCallback(
    (query: string) => {
      dispatch(setSearchQuery({ query }));
      dispatch(setFilterTag({ tag: "" }));
    },
    [dispatch]
  );

  const keyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== "Enter") return;
    filterQuery(inputRef?.current?.value === "" ? "all" : inputRef?.current?.value!!);
  };

  /**
   * cleanup input value & filterQuery
   */
  const clearInput = () => {
    setText("");
    filterQuery("all");
  };

  const handleSearch = () => {
    filterQuery(inputRef?.current?.value === "" ? "all" : inputRef?.current?.value!!);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center">
        <span
          className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
          style={{
            filter: "drop-shadow(0 0 15px rgba(16, 185, 129, 0.3))",
          }}
        >
          Search Posts
        </span>
      </h3>

      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>

        <div className="relative backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-xl overflow-hidden">
          <div className="flex items-center">
            <div className="flex-1 flex items-center px-6 py-4">
              <svg
                className="w-6 h-6 text-gray-500 dark:text-gray-400 mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <input
                ref={inputRef}
                type="text"
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
                onKeyDown={(e) => keyDown(e)}
                placeholder="제목 또는 내용으로 포스트 검색하기..."
                className="flex-1 bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-lg"
              />
            </div>

            {text && (
              <button
                onClick={clearInput}
                className="mr-2 p-2 rounded-xl hover:bg-white/10 dark:hover:bg-gray-800/20 transition-all duration-300 group/clear"
              >
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover/clear:text-red-500 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}

            <button
              onClick={handleSearch}
              className="mr-4 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              검색
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
