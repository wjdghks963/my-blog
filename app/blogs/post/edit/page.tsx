"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { MutationResult, PostPostJson } from "@types";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { useSelector } from "react-redux";

import { useMutation } from "@libs/client/useMutation";

import { ReduxSliceState } from "@store/modules";

import ItemSelector from "@components/Post/ItemSelector";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface TagsData {
  tags: { tag: string }[];
}

interface CategoriesData {
  categories: { id: string; category: string }[];
}

async function fetchTags() {
  const res = await fetch(process.env.NEXT_PUBLIC_APIDOMAIN + `/api/blogs/tags`);
  return res.json();
}

async function fetchCategories() {
  const res = await fetch(process.env.NEXT_PUBLIC_APIDOMAIN + `/api/categories`);
  return res.json();
}

export default function Page() {
  const router = useRouter();

  const editPostData = useSelector((state: ReduxSliceState) => state.editPostReducer);

  const [markdown, setMarkdown] = useState<string | undefined>(editPostData.markdown);
  const [editPost, { data }] = useMutation<MutationResult>(`/api/blogs/post/edit?id=${editPostData.id}`);
  const { data: session } = useSession();

  const { data: tagsData } = useSuspenseQuery<TagsData>({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: Infinity,
  });

  const { data: categoriesData } = useSuspenseQuery<CategoriesData>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: Infinity,
  });

  // 태그 상태 관리
  const [inputTag, setInputTag] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(editPostData.tags ?? []);

  // 카테고리 상태 관리
  const [inputCategory, setInputCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string[]>(
    editPostData.category ? [editPostData.category.category] : []
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, input: string, addItem: (item: string) => void) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      addItem(input.trim());
    }
  };

  const addTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
      setInputTag("");
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  const addCategory = (category: string) => {
    if (category && !selectedCategory.includes(category)) {
      setSelectedCategory([category]); // 카테고리는 하나만 선택 가능하도록 변경
      setInputCategory("");
    }
  };

  const removeCategory = (category: string) => {
    setSelectedCategory((prev) => prev.filter((c) => c !== category));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (session?.user?.email !== process.env.MY_EMAIL) {
      if (process.env.NODE_ENV === "production") {
        return alert("email 확인해주세요");
      }
    }

    const postJson: PostPostJson = {
      title: editPostData.title,
      markdown,
      description: editPostData.description,
      tags: selectedTags,
      category: selectedCategory[0] || null, // 카테고리는 단일 값
    };

    await editPost(postJson);

    if (data?.ok === false) {
      alert("인터넷 오류");
    } else {
      router.replace("/");
    }
  };

  return (
    <>
      <form className="items-center justify-center flex flex-col ">
        <div className="flex mt-5 gap-10 mb-10">
          <div>
            <span>Title - </span>
            <input
              className="outline-none border-2 border-solid border-black focus:border-gray-300 p-1"
              type="text"
              defaultValue={editPostData.title}
              required
            />
          </div>

          <div className="w-1/2">
            <span>Tags - </span>
            <ItemSelector
              id="tags"
              availableItems={tagsData.tags.map((tag) => tag.tag)}
              selectedItems={selectedTags}
              inputItem={inputTag}
              onInputChange={(e) => handleInputChange(e, setInputTag)}
              onKeyDown={(e) => handleKeyDown(e, inputTag, addTag)}
              onAddItem={addTag}
              onRemoveItem={removeTag}
              placeholder="태그 입력 후 Enter"
            />
          </div>

          <div>
            <span>Description - </span>
            <input
              className="outline-none border-2 border-solid border-black focus:border-gray-300 p-1"
              type="text"
              placeholder="줄거리 입력"
              defaultValue={editPostData.description}
              required
            />
          </div>

          <div className="w-1/2">
            <span>Category - </span>
            <ItemSelector
              id="category"
              availableItems={categoriesData.categories.map((category) => category.category)}
              selectedItems={selectedCategory}
              inputItem={inputCategory}
              onInputChange={(e) => handleInputChange(e, setInputCategory)}
              onKeyDown={(e) => handleKeyDown(e, inputCategory, addCategory)}
              onAddItem={addCategory}
              onRemoveItem={removeCategory}
              placeholder="카테고리 입력 후 Enter"
            />
          </div>
        </div>

        <MDEditor
          className="w-full"
          height={1000}
          defaultValue={editPostData.markdown}
          value={markdown}
          onChange={(value) => setMarkdown(value)}
        />

        <button
          onClick={handleSubmit}
          className="text-center w-1/3 my-10 ring-2 ring-offset-2 ring-gray-400 py-2 block hover:bg-gray-400 hover:text-green-50"
        >
          Submit
        </button>
      </form>
    </>
  );
}
