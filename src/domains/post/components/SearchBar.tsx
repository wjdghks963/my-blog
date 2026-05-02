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
    <div className="w-full">
      <label
        htmlFor="post-search"
        className="flex items-center gap-3 border-b-[1.5px] border-ink py-2"
      >
        <span
          aria-hidden
          className="font-display text-[11px] font-bold uppercase tracking-[0.32em] text-muted"
        >
          Find →
        </span>
        <input
          id="post-search"
          type="search"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          placeholder="제목 또는 내용으로 검색"
          autoComplete="off"
          className="flex-1 bg-transparent font-display text-lg font-medium text-ink placeholder:text-muted focus:outline-none mobile:text-xl"
        />
        {text && (
          <button
            type="button"
            onClick={clearInput}
            className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-muted underline underline-offset-[6px] decoration-[1.5px] hover:text-ink"
            aria-label="검색어 지우기"
          >
            Clear
          </button>
        )}
      </label>
    </div>
  );
}
