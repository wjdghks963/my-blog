"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { Control, Controller } from "react-hook-form";

import ItemSelector from "./ItemSelector";

interface TagsData {
  tags: { tag: string }[];
}

async function fetchTags() {
  const apiUrl = process.env.NEXT_PUBLIC_APIDOMAIN || "";
  const res = await fetch(`${apiUrl}/api/blogs/tags`);
  if (!res.ok) {
    throw new Error("Failed to fetch tags");
  }
  return res.json();
}

interface TagInputProps {
  control: Control<any>;
}

export default function TagInput({ control }: TagInputProps) {
  const [inputItem, setInputItem] = useState("");
  const { data: tagsData, isLoading } = useQuery<TagsData, Error>({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: Infinity,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputItem(e.target.value);
  };

  return (
    <div className="w-full md:flex-1 min-w-[200px]">
      <label
        htmlFor="tags"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Tags (최대 5개)
      </label>
      <Controller
        name="tags"
        control={control}
        render={({ field, fieldState: { error } }) => {
          const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && inputItem.trim()) {
              e.preventDefault();
              const newTag = inputItem.trim();
              if (field.value.length < 5 && !field.value.includes(newTag)) {
                field.onChange([...field.value, newTag]);
                setInputItem("");
              } else if (field.value.length >= 5) {
                alert("태그는 최대 5개까지 선택할 수 있습니다.");
              }
            }
          };

          return (
            <>
              <ItemSelector
                id="tags"
                availableItems={tagsData?.tags.map((tag) => tag.tag) || []}
                selectedItems={field.value || []}
                inputItem={inputItem}
                onInputChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onAddItem={(tag) => {
                  if (field.value.length < 5 && !field.value.includes(tag)) {
                    field.onChange([...field.value, tag]);
                  } else if (field.value.length >= 5) {
                    alert("태그는 최대 5개까지 선택할 수 있습니다.");
                  }
                }}
                onRemoveItem={(tag) => {
                  field.onChange(field.value.filter((t: string) => t !== tag));
                }}
                placeholder="태그 입력 후 Enter"
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
