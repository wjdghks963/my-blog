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

  // 외부(예: 태그 선택)에서 검색어가 바뀌거나 초기화되면 입력창도 동기화한다.
  useEffect(() => {
    setText(query ?? "");
  }, [query]);

  // 입력값을 디바운스해 검색 쿼리에 반영한다.
  useEffect(() => {
    if (text === query) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      dispatchQuery(text);
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
      <div className="tiny-label" style={{ color: "var(--ink-3)", marginBottom: 10 }}>
        SEARCH
      </div>
      <div
        className="flex items-center gap-3"
        style={{ borderBottom: "2px solid var(--ink)", paddingBottom: 10 }}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="var(--ink-3)"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
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
          className="font-serif flex-1 bg-transparent focus:outline-none"
          style={{
            fontSize: 22,
            fontStyle: "italic",
            fontWeight: 500,
            color: "var(--ink)",
          }}
        />

        {text && (
          <button
            type="button"
            onClick={clearInput}
            aria-label="검색어 지우기"
            style={{
              border: "1px solid var(--rule)",
              color: "var(--ink-3)",
              padding: "5px 10px",
              borderRadius: 4,
              fontSize: 12,
              background: "transparent",
            }}
          >
            지우기 ✕
          </button>
        )}
      </div>
    </div>
  );
}
