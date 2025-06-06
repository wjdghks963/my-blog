"use client";

import React, { ChangeEvent, KeyboardEvent } from "react";

interface ItemSelectorProps {
  id: string;
  availableItems: string[];
  selectedItems: string[];
  inputItem: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onAddItem: (item: string) => void;
  onRemoveItem: (item: string) => void;
  placeholder: string;
  disabled?: boolean;
}

const ItemSelector = ({
  id,
  availableItems = [],
  selectedItems,
  inputItem,
  onInputChange,
  onKeyDown,
  onAddItem,
  onRemoveItem,
  placeholder = "아이템 입력 후 Enter",
  disabled = false,
}: ItemSelectorProps) => {
  return (
    <div>
      <input
        type="text"
        value={inputItem}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="outline-none border-2 border-solid border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 p-2 rounded-md w-full disabled:bg-gray-200 dark:disabled:bg-gray-800"
        list={`${id}-datalist`}
        disabled={disabled}
      />
      <datalist id={`${id}-datalist`}>
        {availableItems.map((item, index) => (
          <option
            key={index}
            value={item}
          />
        ))}
      </datalist>

      <div className="flex flex-row gap-2 mt-2 p-2 border rounded-md overflow-x-scroll scrollbar-hide bg-gray-100 dark:bg-gray-800">
        {selectedItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-200 text-black px-3 py-1 rounded-full shadow-md hover:bg-gray-300 transition-all dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
          >
            {item}
            <button
              className="ml-2 text-gray-500 hover:text-red-500 bg-transparent rounded-full px-2 transition-all dark:text-gray-400 dark:hover:text-red-400"
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
