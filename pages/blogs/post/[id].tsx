import React, { useCallback, useRef, useState } from "react";
import { useMutation } from "@libs/client/useMutation";
import { useRouter } from "next/router";
import Layout from "@components/Layout";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { IPost } from "pages/api/blogs/[id]";
import MarkdownParser from "@components/Post/MarkdownParser";
import { useSession } from "next-auth/react";
import { cls } from "@libs/client/utils";
import { useDispatch } from "react-redux";
import { setPostJson } from "store/modules/post";
import localeDate from "@libs/client/localeDate";

type MutationResult = { ok: boolean };
type PostData = { postData: IPost };

export default function Post({ postData }: PostData) {
  const router = useRouter();
  const [delPost, { data: resData, loading, error }] =
    useMutation<MutationResult>("/api/blogs/delete");
  const { data: session } = useSession();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tags =
    postData.tags.length !== 0 ? postData.tags.map((tag) => tag.tag) : [];

  const date =
    postData.createdAt !== postData.updatedAt
      ? localeDate(postData.updatedAt)
      : localeDate(postData.createdAt);

  const dispatch = useDispatch();
  const editPost = useCallback(() => {
    dispatch(
      setPostJson({
        id: +router.query.id!,
        markdown: postData.content,
        tags: tags,
        title: postData.title,
      })
    );
    return router.push("/blogs/post/edit");
  }, [dispatch, postData.content, postData.title, router, tags]);

  return (
    <Layout
      title={postData.title}
      url=""
      description={postData.content.substring(0, 75) + "..."}
    >
      <div className="flex flex-col mx-10  p-5 border-2 border-gray-700 dark:border-white ">
        <div className="flex w-full ">
          <span className="w-1/2">{date}</span>
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
      <div
        className={cls(
          session?.user?.email === process.env.MY_EMAIL
            ? "visible"
            : "invisible"
        )}
      >
        <span onClick={editPost}>수정</span>
        <span onClick={() => delPost({ id: +router.query.id! })}>삭제</span>
      </div>
    </Layout>
  );
}

// eslint-disable-next-line @next/next/no-typos
export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/blogs/post");
  const list = await res.json();

  const paths = list.map((post: { id: { toString: () => any } }) => ({
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
