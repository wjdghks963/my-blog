"use client";

import { useQuery } from "@tanstack/react-query";
import { MutationResult } from "@/shared/types";
import { PostPostJson } from "@/domains/post/types";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useRef, useState, ChangeEvent, KeyboardEvent } from "react";

import { useMutation } from "@libs/client/useMutation";

import ImageForm from "@components/Post/ImageForm";
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
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [markdown, setMarkdown] = useState<string | undefined>("");
  const [postBlog, { data }] = useMutation<MutationResult>("/api/blogs/post");
  const { data: session } = useSession();

  const { data: tagsData } = useQuery<TagsData>({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: Infinity,
  });

  const { data: categoriesData } = useQuery<CategoriesData>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: Infinity,
  });

  const [inputTag, setInputTag] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [inputCategory, setInputCategory] = useState("");
  const [selectedCategory, setCategory] = useState<string[]>([]);

  const addTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
      setInputTag(""); // 입력창 초기화
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  const addCategory = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      setCategory((prev) => [...prev, tag]);
      setInputCategory(""); // 입력창 초기화
    }
  };

  const removeCategory = (tag: string) => {
    setCategory((prev) => prev.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (session?.user?.email !== process.env.MY_EMAIL) {
      if (process.env.NODE_ENV === "production") {
        return alert("email 확인해주세요");
      }
    }

    const titleVal = titleRef.current?.value;
    const descVal = descriptionRef.current?.value;

    if (titleVal === "" || markdown === "" || descVal === "") {
      return alert("빈 값 확인");
    }

    const postJson: PostPostJson = {
      title: titleRef.current?.value!,
      markdown,
      description: descriptionRef.current?.value!,
      tags: selectedTags,
      category: selectedCategory[0] || null, // 카테고리는 단일 값
    };

    await postBlog(postJson);

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
              ref={titleRef}
              required
            />
          </div>

          <div className="w-1/2">
            <span>Tags - </span>
            <ItemSelector
              id="tags"
              availableItems={tagsData?.tags.map((tag) => tag.tag)}
              selectedItems={selectedTags} // 선택된 태그
              inputItem={inputTag} // 입력 값
              onInputChange={(e: ChangeEvent<HTMLInputElement>) => setInputTag(e.target.value)} // 입력 핸들러
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
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

          <div>
            <span>Description - </span>
            <input
              className="outline-none border-2 border-solid border-black focus:border-gray-300 p-1"
              type="text"
              ref={descriptionRef}
              placeholder="줄거리 입력"
              required
            />
          </div>

          <div>
            <span>Category - </span>
            <ItemSelector
              id="category"
              availableItems={categoriesData?.categories.map((category) => category.category) ?? []}
              selectedItems={selectedCategory}
              inputItem={inputCategory}
              onInputChange={(e: ChangeEvent<HTMLInputElement>) => setInputCategory(e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter" && inputCategory.trim()) {
                  e.preventDefault();
                  addCategory(inputCategory.trim());
                }
              }}
              onAddItem={addCategory}
              onRemoveItem={removeCategory}
              placeholder="카테고리 입력 후 Enter"
            />
          </div>
        </div>

        <MDEditor
          className="w-full"
          height={1000}
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

      {session?.user?.email === process.env.MY_EMAIL ? <ImageForm /> : null}
    </>
  );
}
