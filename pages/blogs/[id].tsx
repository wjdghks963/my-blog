import React, { useState } from "react";
import { useMutation } from "@libs/client/useMutation";
import { useRouter } from "next/router";

type MutationResult = { ok: boolean };

export default function Post() {
  const router = useRouter();

  const [delPost, { data, loading, error }] =
    useMutation<MutationResult>("/api/blogs/delete");

  return (
    <>
      <div
        onClick={() => {
          delPost(router);
        }}
      >
        삭제하기
      </div>
    </>
  );
}
