"use client";

import { MutationResult, PostPostJson } from "@types";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

import { useMutation } from "@libs/client/useMutation";

import ImageForm from "@components/Post/ImageForm";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function Page() {
  const router = useRouter();
  const tagsRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const [markdown, setMarkdown] = useState<string | undefined>("");
  const [postBlog, { data }] = useMutation<MutationResult>("/api/blogs/post");
  const { data: session } = useSession();

  const splitTags = (): string[] => {
    const { value } = tagsRef?.current!;

    if (value === "") return [""];
    const splitArr = value.split(", ");
    return splitArr.filter((el, index) => {
      return splitArr.indexOf(el) === index;
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (session?.user?.email !== process.env.MY_EMAIL) {
      if (process.env.NODE_ENV === "production") {
        return alert("email 확인해주세요");
      }
    }

    const postJson: PostPostJson = {
      title: titleRef.current?.value!,
      markdown,
      description: descriptionRef.current?.value!,
      tags: splitTags(),
      category: categoryRef.current?.value!,
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
          <div>
            <span>Tags - </span>
            <input
              className="outline-none border-2 border-solid border-black focus:border-gray-300 p-1"
              type="text"
              ref={tagsRef}
              placeholder="tag들은 , 로 분리함"
              required
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
            <input
              className="outline-none border-2 border-solid border-black focus:border-gray-300 p-1"
              type="text"
              ref={categoryRef}
              placeholder="카테고리 입력"
              required
            />
          </div>
        </div>
        <MDEditor
          className="w-full"
          height={500}
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
