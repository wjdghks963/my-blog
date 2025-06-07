import TableOfContents from "@domains/post/components/MarkdownContentTable";
import MarkdownParser from "@domains/post/components/MarkdownParser";
import PostEditDeleteBox from "@domains/post/components/PostEditDeleteBox";
import { IPost } from "@domains/post/types";
import TagSpan from "@shared/components/TagSpan";
import compareLocaleDate from "@shared/utils/CompareLocaleDate";
import { notFound } from "next/navigation";

import { getAllPostId } from "@libs/server/getAllPostId";

type Props = {
  postData: IPost;
};

export default function PostDetailPage({ postData }: Props) {
  if (!postData) {
    notFound();
  }

  const tags = postData.tags?.length !== 0 ? postData.tags?.map((tag) => tag.tag) : [];
  const date = compareLocaleDate(postData.createdAt!, postData.updatedAt!);

  return (
    <div className="font-roboto-regular pb-16">
      <div className="flex flex-col mx-3 mt-16 mobile:mx-10 p-5 border-2 border-gray-500 bg-gray-100 dark:border-gray-300 dark:bg-gray-800">
        <div className="flex w-full">
          <span className="w-1/2">{date}</span>
          <div className="flex flex-row gap-4 w-1/2 justify-end">
            {tags
              ? tags.map((tag, index: number) => (
                  <TagSpan
                    key={index}
                    tag={tag}
                    clickOk={true}
                    goBlog={true}
                  />
                ))
              : null}
          </div>
        </div>
        {postData.category ? <span className="">카테고리 : {postData.category}</span> : null}
        <span className="my-3">조회 : {postData.views}</span>
        <h1 className="font-bold text-5xl mt-10">{postData.title}</h1>
        <TableOfContents markdown={postData.content} />

        <div className="mt-20 prose h-full">
          <MarkdownParser markdown={postData.content} />
        </div>
      </div>
      <PostEditDeleteBox postData={postData} />
    </div>
  );
}

// only run at build time
export async function generateStaticParams() {
  const { postsId } = await getAllPostId();
  return postsId.map((item: { id: number }) => ({ id: item.id + "" }));
}
