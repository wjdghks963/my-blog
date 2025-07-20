"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Control, Controller } from "react-hook-form";

import ItemSelector from "./ItemSelector";

interface CategoriesData {
  categories: { id: string; category: string }[];
}

async function fetchCategories() {
  const res = await fetch(`/api/categories`);
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
}

interface CategoryInputProps {
  control: Control<any>;
}

export default function CategoryInput({ control }: CategoryInputProps) {
  const [inputItem, setInputItem] = useState("");
  const { data: categoriesData, isLoading } = useQuery<CategoriesData, Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: Infinity,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputItem(e.target.value);
  };

  return (
    <div className="w-full md:flex-1 min-w-[200px]">
      <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Category
      </label>
      <Controller
        name="category"
        control={control}
        render={({ field, fieldState: { error } }) => {
          const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && inputItem.trim()) {
              e.preventDefault();
              const newCategory = inputItem.trim();
              if (!field.value.includes(newCategory)) {
                field.onChange([...field.value, newCategory]);
              }
              setInputItem("");
            }
          };

          return (
            <>
              <ItemSelector
                id="category"
                availableItems={categoriesData?.categories.map((cat) => cat.category) || []}
                selectedItems={field.value || []}
                inputItem={inputItem}
                onInputChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onAddItem={(category) => {
                  if (!field.value.includes(category)) {
                    field.onChange([...field.value, category]);
                  }
                }}
                onRemoveItem={(category) => {
                  field.onChange(field.value.filter((c: string) => c !== category));
                }}
                placeholder="카테고리 선택 또는 입력 후 Enter"
                disabled={isLoading}
              />
              {error && <p className="text-red-500 mt-1">{error.message}</p>}
            </>
          );
        }}
      />
    </div>
  );
}
