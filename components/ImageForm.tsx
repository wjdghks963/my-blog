import { useMutation } from "@libs/client/useMutation";
import React, { useState } from "react";

export default function ImageForm() {
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState<string>("");

  console.log(process.env.CLOUD_PRESET_NAME);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("file", image);
    form.append("upload_preset", `${process.env.CLOUD_PRESET_NAME}`);

    await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: form,
      }
    )
      .then((response) => response.json().catch(() => {}))
      .then((res) => setImgUrl(res.url));
  };

  return (
    <div className="items-center w-full flex flex-col gap-5">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button className=" hover:ring-green-400 hover:ring-2 hover:ring-offset-2 hover:bg-green-400 hover:text-white px-2">
          url 생성
        </button>
      </form>
      {imgUrl}
    </div>
  );
}
