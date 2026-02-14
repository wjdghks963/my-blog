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

  const clearInput = () => {
    setText("");
    filterQuery("all");
  };

  const handleSearch = () => {
    filterQuery(inputRef?.current?.value === "" ? "all" : inputRef?.current?.value!!);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h3 className="section-title mb-4 text-center">Search Posts</h3>

      <div className="surface-card-soft p-2">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center px-3 py-2">
            <svg
              className="mr-3 h-5 w-5 text-muted"
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
              placeholder="제목 또는 내용으로 검색"
              className="flex-1 bg-transparent text-base text-[var(--text-primary)] placeholder:text-muted focus:outline-none"
            />
          </div>

          {text && (
            <button
              onClick={clearInput}
              className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-white/60 dark:hover:bg-white/10"
              aria-label="검색어 지우기"
            >
              초기화
            </button>
          )}

          <button
            onClick={handleSearch}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            검색
          </button>
        </div>
      </div>
    </div>
  );
}
