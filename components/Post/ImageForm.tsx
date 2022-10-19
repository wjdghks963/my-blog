import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function ImageForm() {
  const [image, setImage] = useState<any>("");
  const [imgUrl, setImgUrl] = useState<string>("");
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (session?.user?.email === process.env.MY_EMAIL) return;
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
        <input
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setImage(e.currentTarget.files![0]);
          }}
        />
        <button className=" hover:ring-green-400 hover:ring-2 hover:ring-offset-2 hover:bg-green-400 hover:text-white px-2">
          url 생성
        </button>
      </form>
      {imgUrl}
    </div>
  );
}
