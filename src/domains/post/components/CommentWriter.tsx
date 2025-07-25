"use client";

import UserInfoBox from "@domains/comment/components/UserInfoBox";
import { CommentService } from "@domains/comment/services/comment.service";
import LoadingSpinner from "@shared/components/LoadingSpinner";
import { cls } from "@shared/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { CommentPostJson, UserInfo } from "@types";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";

const commentService = CommentService.getInstance();

export const dynamic = "force-dynamic";

export default function CommentWriter({ className }: { session?: any; className?: string }) {
  const session = useSession();
  const router = useRouter();
  const { id: postId } = useParams();
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const postCommentMutation = useMutation({
    mutationFn: (formData: CommentPostJson) => commentService.createComment(formData),
  });

  const isLoggedIn = session.data?.user;

  const userInfo: UserInfo = {
    image: session.data?.user?.image ?? "",
    name: session.data?.user?.name ?? "",
    email: session.data?.user?.email ?? "",
  };

  const textAreaPlaceholder = session.data
    ? "댓글 등록 이후 10초가 지나면 확인 할 수 있습니다."
    : "댓글을 등록하려면 로그인이 필요합니다.";
  const redirectToProfile = () => {
    if (!isLoggedIn) {
      return router.push("/profile");
    }
    return;
  };

  const submitComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (postCommentMutation.isPending || !isLoggedIn) return;

    const commentContent = commentRef.current?.value;

    if (commentContent) {
      const postData: CommentPostJson = {
        postId: postId + "",
        userEmail: session.data?.user?.email + "",
        content: commentContent + "",
      };
      postCommentMutation.mutate(postData);

      if (commentRef.current) {
        commentRef.current.value = "";
      }
      return;
    } else {
      return;
    }
  };

  return (
    <div
      className={"flex justify-center w-2/3 gap-4 ml-3"}
      onClick={redirectToProfile}
    >
      {session.data ? <UserInfoBox userInfo={userInfo} /> : null}
      <form
        className={"flex gap-4 w-full"}
        onSubmit={(event) => submitComment(event)}
      >
        <textarea
          placeholder={textAreaPlaceholder}
          disabled={!isLoggedIn}
          className={cls(
            !!isLoggedIn ? "" : "cursor-not-allowed",
            "w-full thin-round-black-border resize-none p-2 focus:outline-none"
          )}
          ref={commentRef}
        />
        <button
          className={
            "h-full w-16 thin-round-black-border m-auto text-center hover:ring-2 hover:ring-offset-2 hover:ring-black"
          }
        >
          {postCommentMutation.isPending ? <LoadingSpinner /> : "등록"}
        </button>
      </form>
    </div>
  );
}
