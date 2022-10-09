import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useRef } from "react";

const QuillWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function Post() {
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input.files) {
        var file: any = input.files[0];
        var formData = new FormData();
        formData.append("image", file);
        var fileName = file.name;
        console.log(formData);
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ align: [] }],
        ["bold", "italic", "underline", "strike", "blockquote", "codeblock"],
        [{ list: "ordered" }, { list: "bullet" }, "link"],
        [
          {
            color: [
              "#000000",
              "#e60000",
              "#ff9900",
              "#ffff00",
              "#008a00",
              "#0066cc",
              "#9933ff",
              "#ffffff",
              "#facccc",
              "#ffebcc",
              "#ffffcc",
              "#cce8cc",
              "#cce0f5",
              "#ebd6ff",
              "#bbbbbb",
              "#f06666",
              "#ffc266",
              "#ffff66",
              "#66b966",
              "#66a3e0",
              "#c285ff",
              "#888888",
              "#a10000",
              "#b26b00",
              "#b2b200",
              "#006100",
              "#0047b2",
              "#6b24b2",
              "#444444",
              "#5c0000",
              "#663d00",
              "#666600",
              "#003700",
              "#002966",
              "#3d1466",
              "custom-color",
            ],
          },
          { background: [] },
        ],
        ["image", "video"],
        ["clean"],
      ],
    },
  };
  const formats = [
    //'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const tagsRef = useRef();

  const splitTags = () => {
    let { value } = tagsRef.current;

    if (value === "") return;
    return value.split(",");
  };

  const handleText = (value: any) => {
    setText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(splitTags());
  };

  return (
    <form className="items-center justify-center flex flex-col ">
      <QuillWrapper
        className="mt-10"
        modules={modules}
        theme="snow"
        value={text}
        onChange={handleText}
        formats={formats}
      />
      <div className="flex mt-5 gap-4">
        <div>
          <span>Title - </span>
          <input
            className="outline-none border-2 border-solid border-black focus:border-green-500 p-1"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <span>Tags - </span>
          <input
            className="outline-none border-2 border-solid border-black focus:border-green-500 p-1"
            type="text"
            ref={tagsRef}
            placeholder="tag들은 , 로 분리함"
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="text-center w-1/3 mt-10 ring-2 ring-green-400 py-2 block hover:bg-green-400 hover:text-green-50"
      >
        Submit
      </button>
    </form>
  );
}
