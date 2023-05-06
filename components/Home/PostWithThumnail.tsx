import { PostWithId } from "pages/blogs";
import Image from "next/image";
import router from "next/router";
import { RegImageSrc } from "@libs/client/RegImage";
import {cls, setCollapse} from "@libs/client/utils";

const titleLimitLength = 20;
const descriptionLimitLength = 30;

export default function PostWithThumnail({
  data,
  isMobile,
}: {
  data: PostWithId;
  isMobile?: boolean;
}) {
  const src = RegImageSrc(data.content);

  const moveToPost = (id: number) => {
    return router.push(`/blogs/post/${id}`);
  };

  return (
    <div
      onClick={() => moveToPost(data.id)}
      className={cls(
        "flex flex-col items-center w-full group border-black border-2 rounded-md shadow-xl cursor-pointer dark:border-white dark:shadow-neutral-600",
        isMobile ? "hidden mobile:flex" : ""
      )}
    >
      {src ? (
        <div className="w-full h-[200px] relative group-hover:sm:animate-[ping_1s_forwards] invisible sm:visible">
          <div className="w-16"></div>
          <Image
            layout="fill"
            objectFit="cover"
            src={
              src?.groups!.filename.startsWith("(https://res.cloudinary.com/")
                ? "/api/postImage/" +
                  src?.groups!.filename.substring(
                    "(https://res.cloudinary.com/".length
                  )
                : src?.groups!.filename.substring(1)
            }
            alt="d"
          />
        </div>
      ) : (
        <div className="w-full h-[200px] flex items-center justify-center invisible sm:visible">
          <div className="w-16 h-16 border-black border-4 rounded-full  group-hover:sm:animate-[ping_1s_forwards] dark:border-white"></div>
        </div>
      )}
      <div className="absolute w-28  flex flex-col items-center invisible">
        <span className="break-words my-3 font-bold text-md md:w-full sm:w-2/3 w-12 visible sm:invisible group-hover:sm:delay-500 group-hover:sm:visible">
          {setCollapse(data.title, titleLimitLength)}
        </span>
        <span className="break-words md:w-full sm:w-2/3 invisible group-hover:sm:visible group-hover:sm:delay-500">
          {setCollapse(data.description, descriptionLimitLength)}
        </span>
      </div>
    </div>
  );
}
