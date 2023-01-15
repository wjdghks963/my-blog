import React, { useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery, setSelected } from "store/modules/searchQuery";

export function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const filterQuery = useCallback(() => {
    dispatch(setSearchQuery({ query: inputRef?.current?.value!! }));
  }, [dispatch]);
  const searchQuerySelected = useCallback(() => {
    dispatch(setSelected({ isSelected: true }));
  }, [dispatch]);

  const keyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== "Enter") return;
    filterQuery();
    searchQuerySelected();
  };

  return (
    <div className="w-full flex justify-center my-20">
      <input
        ref={inputRef}
        type="text"
        onKeyDown={(e) => keyDown(e)}
        placeholder="제목을 입력 후 엔터"
        className="w-1/2 py-4 px-4 border-2 border-black rounded-md shadow-md outline-none focus:outline-2 focus:outline-black"
      />
    </div>
  );
}
