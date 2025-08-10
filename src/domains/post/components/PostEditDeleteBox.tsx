"use client";

import { PostService } from "@domains/post/services/post.service";
import { postQueryKeys } from "@domains/post/services/post.service";
import { IPost } from "@domains/post/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { setPostJson } from "@store/modules/editPost";

export const dynamic = "force-dynamic";

const postService = PostService.getInstance();

export default function PostEditDeleteBox({ postData }: { postData: IPost }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data: session } = useSession();

  const deletePostMutation = useMutation({
    mutationFn: async () => {
      if (typeof id === "string") {
        return postService.deletePost(Number(id));
      }
      // id가 string[]이거나 undefined인 경우 에러 처리 또는 다른 로직 수행
      throw new Error("Invalid post ID for deletion");
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: postQueryKeys.all }),
        queryClient.invalidateQueries({
          queryKey: postQueryKeys.detail(typeof id === "string" ? Number(id) : Number(id)),
        }),
      ]);
      router.push("/");
    },
    onError: (error) => {
      // 에러 처리 로직 (예: alert)
      alert(`게시글 삭제에 실패했습니다: ${error.message}`);
    },
  });

  const onDeleteClick = () => {
    if (deletePostMutation.isPending) return;
    // eslint-disable-next-line no-restricted-globals
    if (confirm("진짜 삭제하시겠습니까?")) {
      deletePostMutation.mutate(); // mutate 호출 시 인자 필요 없음
    } else {
      return;
    }
  };

  const dispatch = useDispatch();
  const editPost = () => {
    if (!id || Array.isArray(id)) return;

    dispatch(
      setPostJson({
        id: +id,
        title: postData.title,
        category: postData.category ? [postData.category] : [],
        description: postData.description,
        markdown: postData.content,
        tags: postData.tags?.map((item) => item.tag) || [],
      })
    );
    return router.push("/blogs/post/edit");
  };

  const blogOwner = session?.user?.email === process.env.MY_EMAIL;

  return (
    <>
      {blogOwner && (
        <div className="flex w-full justify-center mt-10 gap-10 cursor-pointer">
          <span
            className="border-black border-2 rounded-xl p-2"
            onClick={editPost}
          >
            수정
          </span>
          <span
            className="border-black border-2 rounded-xl p-2"
            onClick={onDeleteClick}
          >
            삭제
          </span>
        </div>
      )}
    </>
  );
}
