"use client";

import React, { ChangeEvent, KeyboardEvent } from "react";

interface ItemSelectorProps {
  id: string;
  availableItems: string[] | undefined;
  selectedItems: string[];
  inputItem: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void; // onKeyDown 추가
  onAddItem: (item: string) => void;
  onRemoveItem: (item: string) => void;
  placeholder: string;
}

const ItemSelector = ({
  id,
  availableItems = [],
  selectedItems,
  inputItem,
  onInputChange,
  onAddItem,
  onRemoveItem,
  placeholder = "아이템 입력 후 Enter",
}: ItemSelectorProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputItem.trim()) {
      e.preventDefault();
      const newItems = splitItems(inputItem.trim()); // 입력된 문자열을 아이템으로 분리
      newItems.forEach((item) => {
        if (!selectedItems.includes(item)) {
          onAddItem(item);
        }
      });
      onInputChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>); // 입력 초기화
    }
  };

  const splitItems = (itemString: string): string[] => {
    return itemString
      .split(/,\s*/) // 쉼표와 공백으로 분리
      .filter((item) => item.trim() !== ""); // 빈 값 필터링
  };

  return (
    <div>
      <input
        type="text"
        value={inputItem}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="outline-none border-2 border-solid border-black focus:border-gray-300 p-2 w-full rounded-md"
        list={id}
      />
      <datalist id={id}>
        {availableItems.map((item, index) => (
          <option
            key={index}
            value={item}
          />
        ))}
      </datalist>

      <div className="flex flex-row gap-2 mt-2 p-2 border rounded-md overflow-x-scroll scrollbar-hide bg-gray-100">
        {selectedItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-200 text-black px-3 py-1 rounded-full shadow-md hover:bg-gray-300 transition-all"
          >
            {item}
            <button
              className="ml-2 text-gray-500 hover:text-red-500 bg-transparent rounded-full px-2 transition-all"
              onClick={() => onRemoveItem(item)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemSelector;
