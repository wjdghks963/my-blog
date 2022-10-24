import React, { useEffect, useState } from "react";
import ImageForm from "@components/Post/ImageForm";
import dynamic from "next/dynamic";
import { useRef } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useMutation } from "@libs/client/useMutation";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { EditPost } from "store/modules/editPost";

type MutationResult = { ok: boolean };

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function Edit() {
  const router = useRouter();
  const tagsRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [markdown, setMarkdwon] = useState<string | undefined>("");
  const [edit, { data: res, error }] =
    useMutation<MutationResult>(`/api/blogs/edit`);

  const postJson: EditPost = useSelector(
    (state: { editPostReducer: EditPost }) => state.editPostReducer
  );

  const splitTags = (): string[] | void => {
    let { value } = tagsRef?.current!;

    if (value === "") return;
    const splitArr = value.split(", ");
    const set = splitArr.filter((el, index) => {
      return splitArr.indexOf(el) === index;
    });
    return set;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      id: postJson.id,
      title: titleRef?.current?.value,
      markdown,
      tags: splitTags(),
    };

    edit(data);

    if (res?.ok === false) {
      alert("인터넷 오류");
      console.log(error);
    } else {
      router.replace("/");
    }
    console.log(res);
  };

  useEffect(() => {
    setMarkdwon(postJson.markdown);
  }, [postJson.markdown]);

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
              defaultValue={postJson.title}
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
              defaultValue={postJson.tags?.join(", ")}
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
              defaultValue={postJson.description}
              required
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
