import React, { useRef, useState } from "react";
import { useMutation } from "@libs/client/useMutation";
import { useRouter } from "next/router";
import Layout from "@components/Layout";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { IPost } from "pages/api/blogs/[id]";
import MarkdownParser from "@components/MarkdownParser";

type MutationResult = { ok: boolean };
type PostData = { postData: IPost };

export default function Post({ postData }: PostData) {
  const [delPost, { data: resData, loading, error }] =
    useMutation<MutationResult>("/api/blogs/delete");
  console.log(postData);

  const tags = postData.tags.map((tag) => tag.tag.tag);
  const localeDate = (date: string) => new Date(date).toLocaleDateString();

  const date =
    postData.createdAt !== postData.updateAt
      ? localeDate(postData.updateAt)
      : localeDate(postData.createdAt);

  return (
    <Layout
      title={postData.title}
      url=""
      description={postData.content.substring(0, 75) + "..."}
    >
      <div className="flex flex-col mx-10  p-5 border-2 border-gray-700 dark:border-white ">
        <div className="flex w-full ">
          <span className="w-1/2">{date.substring(0, date.length - 1)}</span>
          <div className="flex flex-row gap-4 w-1/2 justify-end">
            {tags.map((tag: string, index: number) => (
              <span
                className="px-1 ring-2 ring-offset-4 ring-gray-500 rounded-md dark:ring-white dark:ring-2 dark:ring-offset-1 dark:px-2"
                key={index}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span className="my-3">조회 : {postData.views}</span>
        <h1 className="font-extrabold text-7xl mt-10">{postData.title}</h1>
        <div className="mt-20 prose h-full">
          <MarkdownParser markdown={postData.content} />
        </div>
      </div>
    </Layout>
  );
}

// eslint-disable-next-line @next/next/no-typos
export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/blogs/post");
  const list = await res.json();

  const paths = list.map((post) => ({
    params: {
      id: post.id.toString(),
    },
  }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }): GetStaticProps {
  const response = await fetch(`http://localhost:3000/api/blogs/${params.id}`);

  const postData = await response.json();

  return {
    props: {
      postData,
    },
  };
}
