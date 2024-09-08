import { IPost } from "@types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import process from "process";

import compareLocaleDate from "@libs/client/CompareLocaleDate";
import { RegImageSrc } from "@libs/server/RegImageSrc";
import { getAllPostId } from "@libs/server/getAllPostId";
import { ISR } from "@libs/server/isr";

import TagSpan from "@components/Base/TagSpan";
import TableOfContents from "@components/Post/MarkdownContentTable";
import MarkdownParser from "@components/Post/MarkdownParser";
import PostEditDeleteBox from "@components/Post/PostEditDeleteBox";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const data: IPost = await fetchData(id);
  if (!data) {
    notFound();
  }

  const ImageSrc = RegImageSrc(data?.content) ?? "";
  const tags = data.tags?.length !== 0 ? data.tags?.map((tag) => tag.tag) : [];

  return {
    title: data.title,
    description: data.description,
    keywords: tags?.join(","),
    openGraph: {
      title: data.title,
      description: data.description,
      images: [
        {
          url: `${ImageSrc}`,
          alt: `${data.title}과 관련된 사진`,
        },
      ],
    },
  };
}

export default async function Page({ params: { id } }: Props) {
  const postData: IPost = await fetchData(id);

  if (!postData) {
    notFound();
  }

  const tags = postData.tags?.length !== 0 ? postData.tags?.map((tag) => tag.tag) : [];

  const date = compareLocaleDate(postData.createdAt!, postData.updatedAt!);

  return (
    <div className="font-roboto-regular">
      <div className="flex flex-col mx-3 mt-16 mobile:mx-10 p-5 border-2 border-gray-700 dark:border-white bg-[#f9f9f9]">
        <div className="flex w-full">
          <span className="w-1/2">{date}</span>
          <div className="flex flex-row gap-4 w-1/2 justify-end">
            {tags
              ? tags.map((tag, index: number) => (
                  <TagSpan
                    key={index}
                    tag={tag.tag}
                    clickOk={true}
                    goBlog={true}
                  />
                ))
              : null}
          </div>
        </div>
        {postData.category ? <span className="">카테고리 : {postData.category.category}</span> : null}
        <span className="my-3">조회 : {postData.views}</span>
        <h1 className="font-bold text-5xl mt-10">{postData.title}</h1>
        <TableOfContents markdown={postData.content} />

        <div
          className="mt-20 prose h-full"
          suppressHydrationWarning
        >
          <MarkdownParser markdown={postData.content} />
        </div>
      </div>
      <PostEditDeleteBox postData={postData} />
    </div>
  );
}

async function fetchData(id: string) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_APIDOMAIN + `/api/blogs/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Failed to fetch data:", res.status, res.statusText);
      return undefined;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return undefined;
  }
}
// only run at build time
export async function generateStaticParams() {
  const { postsId } = await getAllPostId();
  return postsId.map((item) => ({ id: item.id + "" }));
}
