import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import type { GetStaticPropsResult } from "next";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useMutation } from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import localeDate from "@libs/client/localeDate";
import Layout from "@components/Base/Layout";
import TagSpan from "@components/Post/TagSpan";
import BlogPostById, { IPost } from "pages/api/blogs/[id]";
import { setPostJson } from "store/modules/editPost";
import { RegImageSrc } from "@libs/client/RegImage";
import AllPostId from "pages/api/blogs/post/getAllPostsId";
import dynamic from "next/dynamic";

type MutationResult = { ok: boolean };
interface PostData extends IPost {
  ok: boolean;
  message?: string;
}

const MarkdownParser = dynamic(() => import("@components/Post/MarkdownParser"));

export default function Post({ postData }: { postData: PostData }) {
  const router = useRouter();
  const [delPost] = useMutation<MutationResult>("/api/blogs/delete");
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
        description: postData.description,
      })
    );
    return router.push("/blogs/post/edit");
  }, [
    dispatch,
    postData.content,
    postData.description,
    postData.title,
    router,
    tags,
  ]);

  const ImageSrc =
    RegImageSrc(postData.content) !== null || undefined
      ? RegImageSrc(postData.content)?.groups?.filename
      : "";
  const SEOImage = ImageSrc?.substring(1, ImageSrc.length);

  return (
    <Layout
      title={postData.title}
      url={`/blogs/post/${router.query.id}`}
      description={postData.content.substring(0, 75) + "..."}
      image={SEOImage}
      keywords={tags.join(",")}
    >
      <div className="flex flex-col mx-10 p-5 border-2 border-gray-700 dark:border-white">
        <div className="flex w-full">
          <span className="w-1/2">{date}</span>
          <div className="flex flex-row gap-4 w-1/2 justify-end">
            {tags
              ? tags.map((tag: string, index: number) => (
                  <TagSpan key={index} tag={tag} clickOk={true} goBlog={true} />
                ))
              : null}
          </div>
        </div>
        <span className="my-3">조회 : {postData.views}</span>
        <h1 className="font-bold text-5xl mx-10 mt-10">{postData.title}</h1>
        <div className="mt-20 prose h-full mx-10">
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
        <div className="flex w-full justify-center mt-10 gap-10">
          <span
            className="border-black border-2 rounded-xl p-2"
            onClick={editPost}
          >
            수정
          </span>
          <span
            className="border-black border-2 rounded-xl p-2"
            onClick={() => {
              delPost({ id: +router.query.id! });
              router.replace("/");
            }}
          >
            삭제
          </span>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await AllPostId();

  const paths = res?.map((post: any) => ({
    params: {
      id: post.id.toString(),
    },
  }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({
  params,
}: {
  params: any;
}): Promise<GetStaticPropsResult<any>> {
  const postData = await BlogPostById(params.id);

  return {
    props: {
      postData: {
        title: postData.title,
        content: postData.content,
        tags: postData.tags,
        views: postData.views,
        description: postData.description,
        createdAt: postData.createdAt + "",
        updatedAt: postData.updatedAt + "",
      },
    },
  };
}
