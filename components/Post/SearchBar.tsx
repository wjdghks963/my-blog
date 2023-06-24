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

  return (
    <div className="hidden sm:flex w-1/2 justify-center mx-auto my-20 group border-2 border-black dark:border-white rounded-md shadow-md focus-within:ring-offset-4 focus-within:ring-2 focus-within:ring-black">
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        onKeyDown={(e) => keyDown(e)}
        placeholder="제목 입력 후 엔터"
        className="w-2/3 py-4 px-4 bg-transparent focus:outline-none"
      />
      <button
        className={`${text === "" || null ? "hidden" : "flex"} w-8 ml-2 my-auto`}
        onClick={clearInput}
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className=""
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </button>
    </div>
  );
}
