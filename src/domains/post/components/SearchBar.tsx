"use client";

import useQuerySelector from "@shared/hooks/useQuerySelector";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { setSearchQuery } from "@store/modules/searchQuery";

const DEBOUNCE_MS = 300;

export function SearchBar() {
  const dispatch = useDispatch();
  const { query } = useQuerySelector();

  const [text, setText] = useState(query ?? "");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dispatchQuery = useCallback(
    (value: string) => {
      dispatch(setSearchQuery({ query: value }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (text !== query) dispatchQuery(text);
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, query, dispatchQuery]);

  const commitNow = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    dispatchQuery(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      e.preventDefault();
      commitNow();
    }
    if (e.code === "Escape" && text) {
      setText("");
      if (timerRef.current) clearTimeout(timerRef.current);
      dispatchQuery("");
    }
  };

  const clearInput = () => {
    setText("");
    if (timerRef.current) clearTimeout(timerRef.current);
    dispatchQuery("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h3 className="section-title mb-4 text-center">Search Posts</h3>

      <div className="surface-card-soft p-2">
        <div className="flex items-center gap-2">
          <label
            htmlFor="post-search"
            className="flex flex-1 items-center px-3 py-2"
          >
            <svg
              className="mr-3 h-5 w-5 text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              id="post-search"
              type="search"
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              onKeyDown={handleKeyDown}
              placeholder="제목 또는 내용으로 검색"
              autoComplete="off"
              className="flex-1 bg-transparent text-base text-[var(--text-primary)] placeholder:text-muted focus:outline-none"
            />
          </label>

          {text && (
            <button
              type="button"
              onClick={clearInput}
              className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-white/60 dark:hover:bg-white/10"
              aria-label="검색어 지우기"
            >
              초기화
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
