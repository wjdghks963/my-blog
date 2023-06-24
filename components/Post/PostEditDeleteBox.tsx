"use client";

import { useMutation } from "@tanstack/react-query";
import { Post } from "@types";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import process from "process";
import { useDispatch } from "react-redux";

import { deletePost } from "@libs/client/postFn";
import { cls } from "@libs/client/utils";

import { setPostJson } from "@store/modules/editPost";

export const dynamic = "force-dynamic";

export default function PostEditDeleteBox({ postData }: { postData: Post }) {
  const router = useRouter();
  const { id } = useParams();
  const { data: session } = useSession();

  const deletePostMutation = useMutation({
    mutationFn: () => deletePost(id),
  });

  const dispatch = useDispatch();
  const editPost = () => {
    dispatch(
      setPostJson({
        id: +id,
        title: postData.title,
        category: postData.category,
        description: postData.description,
        markdown: postData.content,
        // @ts-ignore
        tags: postData.tags.map((item) => item.tag),
      })
    );
    return router.push("/blogs/post/edit");
  };

  return (
    <div className={cls(session?.user?.email === process.env.MY_EMAIL ? "visible" : "invisible")}>
      <div className="flex w-full justify-center mt-10 gap-10 cursor-pointer">
        <span
          className="border-black border-2 rounded-xl p-2"
          onClick={() => editPost()}
        >
          수정
        </span>
        <span
          className="border-black border-2 rounded-xl p-2"
          onClick={() => deletePostMutation.mutate()}
        >
          삭제
        </span>
      </div>
    </div>
  );
}
