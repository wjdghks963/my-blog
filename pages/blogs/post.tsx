import React, { useState } from "react";
import ImageForm from "@components/ImageForm";
import dynamic from "next/dynamic";
import { useRef } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useMutation } from "@libs/client/useMutation";
import { useRouter } from "next/router";

interface IPostJson {
  title?: string;
  markdown: string | undefined;
  tags?: string[] | void;
}

type MutationResult = { ok: boolean };

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function Post() {
  const router = useRouter();
  const tagsRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [markdown, setMarkdwon] = useState<string | undefined>("");
  const [post, { data, loading, error }] =
    useMutation<MutationResult>("/api/blogs/post");

  const splitTags = (): string[] | void => {
    let { value } = tagsRef?.current!;

    if (value === "") return;
    return value.split(", ");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const postJson: IPostJson = {
      title: titleRef?.current?.value,
      markdown,
      tags: splitTags(),
    };

    post(postJson);

    // TODO:: error message 띄우기
    if (data?.ok === false) {
      alert("인터넷 오류");
      console.log(error);
    } else {
      router.replace("/blogs");
    }
    console.log(data);
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
            />
          </div>
          <div>
            <span>Tags - </span>
            <input
              className="outline-none border-2 border-solid border-black focus:border-gray-300 p-1"
              type="text"
              ref={tagsRef}
              placeholder="tag들은 , 로 분리함"
            />
          </div>
        </div>

        <MDEditor
          className="w-4/5"
          value={markdown}
          onChange={(value) => setMarkdwon(value)}
        />

        <button
          onClick={handleSubmit}
          className="text-center w-1/3 my-10 ring-2 ring-offset-2 ring-gray-400 py-2 block hover:bg-gray-400 hover:text-green-50"
        >
          Submit
        </button>
      </form>
      <ImageForm />
    </>
  );
}
