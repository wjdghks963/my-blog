import { PostWithId } from "pages/blogs";
import Image from "next/image";

export default function PostWithThumnail({ data }: { data: PostWithId }) {
  const findUrl = RegExp(
    `!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?[)]`,
    "g"
  );

  const src = findUrl.exec(data.content);

  return (
    <div>
      {src ? (
        <Image
          width={"100px"}
          height={"100px"}
          src={
            "/api/postImage/" +
            src?.groups.filename.substring(
              "(https://res.cloudinary.com/".length
            )
          }
          alt="d"
        />
      ) : null}
    </div>
  );
}
