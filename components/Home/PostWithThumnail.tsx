import { PostWithId } from "pages/blogs";
import Image from "next/image";
import { cls } from "@libs/client/utils";
import router from "next/router";

export default function PostWithThumnail({ data }: { data: PostWithId }) {
  const findUrl = RegExp(
    `!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?[)]`,
    "g"
  );

  const src = findUrl.exec(data.content);

  let content = data.content.substring(0, 30);

  if (data.content.startsWith("![]")) {
    content = `이 포스트는 ${data.title}의 내용입니다.`;
  }

  const moveToPost = (id: number) => {
    return router.push(`/blogs/post/${id}`);
  };

  return (
    <div
      onClick={() => moveToPost(data.id)}
      className="flex flex-col items-center w-full group border-black border-2 rounded-md shadow-xl"
    >
      {src ? (
        <div className="w-full h-[200px] relative group-hover:sm:animate-[ping_1s_forwards]">
          <div className="w-16"></div>
          <Image
            layout="fill"
            objectFit="cover"
            src={
              "/api/postImage/" +
              src?.groups.filename.substring(
                "(https://res.cloudinary.com/".length
              )
            }
            alt="d"
          />
        </div>
      ) : (
        <div className="w-full h-[200px] flex items-center justify-center">
          <div className="w-16 h-16 border-black border-4 rounded-full  group-hover:sm:animate-[ping_1s_forwards] dark:border-white"></div>
        </div>
      )}
      <div className="invisible absolute w-28 group-hover:sm:delay-300 group-hover:sm:visible  flex flex-col items-center">
        <span className="my-3">{data.title}</span>
        <span className="break-all">{content}..</span>
      </div>
    </div>
  );
}
