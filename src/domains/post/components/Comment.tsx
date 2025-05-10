"use client";

import { useMutation } from "@tanstack/react-query";
import { CommentEditJson, CommentWithUser } from "@/domains/comment/types";
import { UserInfo } from "@/shared/types";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

import { deleteComment, editComment } from "@libs/client/postFn";

import LoadingSpinner from "@components/Base/LoadingSpinner";
import UserInfoBox from "@components/Comment/UserInfoBox";

export default function CommentBox({ content, userInfo }: { content: CommentWithUser | null; userInfo?: UserInfo }) {
  const { data: session } = useSession();
  const [editEditor, setEditEditor] = useState<boolean>(false);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const isMine = session?.user?.email === userInfo?.email;
  const blogOwner = session?.user?.email === process.env.MY_EMAIL;

  const editCommentMutation = useMutation({ mutationFn: (formData: CommentEditJson) => editComment(formData) });
  const deleteCommentMutation = useMutation({ mutationFn: (formData: string) => deleteComment(formData) });

  // TODO:: 진짜 삭제 확인 alert
  const deleteCommentClick = async () => {
    if (deleteCommentMutation.isPending) return;
    await deleteCommentMutation.mutate(content?.id + "");
    deleteCommentMutation.isError ? alert("삭제에 실패했습니다") : null;
  };

  const editCommentClick = () => {
    setEditEditor(true);
  };

  const editCommentSubmit = async () => {
    if (editCommentMutation.isPending) return;
    const commentContent = commentRef.current?.value;

    const editJson: CommentEditJson = {
      commentId: content?.id + "",
      content: commentContent + "",
    };

    editCommentMutation.mutate(editJson);
    editCommentMutation.isError ? alert("수정에 실패했습니다") : null;
  };

  return (
    <div className={"flex flex-col gap-3"}>
      <div className={"flex justify-between gap-4 thin-round-black-border px-2.5 py-4"}>
        <UserInfoBox userInfo={userInfo} />
        <span className={"whitespace-pre-wrap"}>{content?.content}</span>
        <div className={"flex flex-col gap-2 ml-auto"}>
          {isMine || blogOwner ? (
            <span
              className={"cursor-pointer thin-round-black-border text-center p-1 w-16 h-8"}
              onClick={editCommentClick}
            >
              수정
            </span>
          ) : null}
          {isMine || blogOwner ? (
            <span
              className={"cursor-pointer thin-round-black-border text-center p-1 w-16 h-8 "}
              onClick={deleteCommentClick}
            >
              {deleteCommentMutation.isPending ? <LoadingSpinner /> : "삭제"}
            </span>
          ) : null}
        </div>
      </div>
      {editEditor ? (
        <form
          className={"flex gap-4 w-full"}
          onSubmit={editCommentSubmit}
        >
          <textarea
            className={"w-full thin-round-black-border resize-none p-2 focus:outline-none"}
            ref={commentRef}
          />
          <button
            className={
              "h-full w-16 thin-round-black-border m-auto text-center hover:ring-2 hover:ring-offset-2 hover:ring-black"
            }
          >
            {editCommentMutation.isPending ? <LoadingSpinner /> : "등록"}
          </button>
        </form>
      ) : null}
    </div>
  );
}
