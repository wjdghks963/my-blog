"use client";

import ImageForm from "@domains/post/components/ImageForm";
import ItemSelector from "@domains/post/components/ItemSelector";
import { PostPostJson } from "@domains/post/types";
import { useMutation } from "@shared/hooks/useMutation";
import { MutationResult } from "@shared/types/common.types";
import { useQuery } from "@tanstack/react-query";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useRef, useState, ChangeEvent, KeyboardEvent, useEffect } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface TagsData {
  tags: { tag: string }[];
}

interface CategoriesData {
  categories: { id: string; category: string }[];
}

async function fetchTags() {
  const apiUrl = process.env.NEXT_PUBLIC_APIDOMAIN || "";
  const res = await fetch(`${apiUrl}/api/blogs/tags`);
  if (!res.ok) {
    throw new Error("Failed to fetch tags");
  }
  return res.json();
}

async function fetchCategories() {
  const apiUrl = process.env.NEXT_PUBLIC_APIDOMAIN || "";
  const res = await fetch(`${apiUrl}/api/categories`);
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
}

export default function PostCreatePage() {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [markdown, setMarkdown] = useState<string | undefined>("");
  const [postBlog, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation<MutationResult>(process.env.NEXT_PUBLIC_APIDOMAIN + "/api/blogs/post");
  const { data: session } = useSession();

  const {
    data: tagsData,
    isLoading: tagsLoading,
    error: tagsError,
  } = useQuery<TagsData, Error>({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: Infinity,
  });

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery<CategoriesData, Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: Infinity,
  });

  const [inputTag, setInputTag] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [inputCategory, setInputCategory] = useState("");
  const [selectedCategory, setCategory] = useState<string[]>([]);

  const addTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag) && selectedTags.length < 5) {
      setSelectedTags((prev) => [...prev, tag]);
      setInputTag("");
    } else if (selectedTags.length >= 5) {
      alert("태그는 최대 5개까지 선택할 수 있습니다.");
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  const selectCategory = (category: string) => {
    setCategory([category]);
    setInputCategory("");
  };

  const removeCategory = () => {
    setCategory([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (session?.user?.email !== process.env.MY_EMAIL) {
      if (process.env.NODE_ENV === "production") {
        alert("이메일을 확인해주세요.");
        return;
      }
    }

    const titleVal = titleRef.current?.value;
    const descVal = descriptionRef.current?.value;

    if (!titleVal?.trim() || !markdown?.trim() || !descVal?.trim()) {
      alert("제목, 내용, 설명을 모두 입력해주세요.");
      return;
    }
    if (selectedCategory.length === 0) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    const postJson: PostPostJson = {
      title: titleVal,
      markdown: markdown,
      description: descVal,
      tags: selectedTags,
      category: selectedCategory[0],
    };

    try {
      await postBlog(postJson);
    } catch (err) {
      let caughtErrorMessage = "게시글 작성 중 오류가 발생했습니다. 네트워크 연결을 확인하고 다시 시도해주세요.";
      if (err instanceof Error) {
        caughtErrorMessage = err.message;
      }
      alert(caughtErrorMessage);
    }
  };

  useEffect(() => {
    if (mutationData) {
      if (mutationData.ok) {
        router.replace("/");
      } else {
        let errorMessage = "게시글 작성에 실패했습니다. 다시 시도해주세요.";
        alert(errorMessage);
      }
    } else if (mutationError) {
      let errorMessage = "게시글 작성에 실패했습니다. 다시 시도해주세요.";
      if (mutationError instanceof Error) {
        errorMessage = mutationError.message;
      } else if (
        typeof mutationError === "object" &&
        mutationError !== null &&
        "message" in mutationError &&
        typeof (mutationError as any).message === "string"
      ) {
        errorMessage = (mutationError as any).message;
      }
      alert(errorMessage);
    }
  }, [mutationData, mutationError, router]);

  if (tagsLoading || categoriesLoading) {
    return <div className="flex justify-center items-center h-screen">로딩 중...</div>;
  }

  if (tagsError || categoriesError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        데이터 로딩 중 오류 발생: {tagsError?.message || categoriesError?.message}
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="items-center justify-center flex flex-col px-4 md:px-0"
      >
        <div className="flex flex-wrap mt-5 gap-x-10 gap-y-5 mb-10 w-full max-w-4xl">
          <div className="w-full md:w-auto">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <input
              id="title"
              className="outline-none border-2 border-solid border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 p-2 rounded-md w-full"
              type="text"
              ref={titleRef}
              required
              placeholder="제목을 입력하세요"
            />
          </div>

          <div className="w-full md:flex-1 min-w-[200px]">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Tags (최대 5개)
            </label>
            <ItemSelector
              id="tags"
              availableItems={tagsData?.tags.map((tag) => tag.tag) || []}
              selectedItems={selectedTags}
              inputItem={inputTag}
              onInputChange={(e) => setInputTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputTag.trim()) {
                  e.preventDefault();
                  addTag(inputTag.trim());
                }
              }}
              onAddItem={addTag}
              onRemoveItem={removeTag}
              placeholder="태그 입력 후 Enter"
            />
          </div>
        </div>
        <div className="flex flex-wrap mt-5 gap-x-10 gap-y-5 mb-10 w-full max-w-4xl">
          <div className="w-full md:w-auto">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <input
              id="description"
              className="outline-none border-2 border-solid border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 p-2 rounded-md w-full"
              type="text"
              ref={descriptionRef}
              placeholder="게시글 요약을 입력하세요"
              required
            />
          </div>
          <div className="w-full md:flex-1 min-w-[200px]">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Category (1개 선택)
            </label>
            <ItemSelector
              id="category"
              availableItems={categoriesData?.categories.map((cat) => cat.category) || []}
              selectedItems={selectedCategory}
              inputItem={inputCategory}
              onInputChange={(e) => setInputCategory(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputCategory.trim()) {
                  e.preventDefault();
                  selectCategory(inputCategory.trim());
                }
              }}
              onAddItem={selectCategory}
              onRemoveItem={removeCategory}
              placeholder="카테고리 선택 또는 입력 후 Enter"
            />
          </div>
        </div>

        <div
          data-color-mode="auto"
          className="w-full max-w-6xl"
        >
          <MDEditor
            height={600}
            value={markdown}
            onChange={(value) => setMarkdown(value)}
            previewOptions={{
              className: "prose dark:prose-invert max-w-none",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={mutationLoading}
          className="text-center w-full max-w-xs my-10 ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-500 py-3 px-4 block hover:bg-gray-400 dark:hover:bg-gray-600 hover:text-white dark:text-gray-200 dark:hover:text-white rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mutationLoading ? "작성 중..." : "Submit"}
        </button>
      </form>

      {session?.user?.email === process.env.MY_EMAIL && <ImageForm />}
    </>
  );
}
