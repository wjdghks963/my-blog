"use client";

import CategoryInput from "@domains/post/components/CategoryInput";
import TagInput from "@domains/post/components/TagInput";
import { postQueryKeys } from "@domains/post/services/post.service";
import { IPost, PostPostJson } from "@domains/post/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { httpService } from "@shared/services/http.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Mermaid } from "../components/Mermaid";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const postFormSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요."),
  description: z.string().min(1, "게시글 요약을 입력해주세요."),
  markdown: z.string().min(1, "내용을 입력해주세요."),
  tags: z.array(z.string()).max(5, "태그는 최대 5개까지 선택할 수 있습니다."),
  category: z.array(z.string()).min(0, "카테고리는 최소 1개 이상 선택해주세요."),
});

type PostFormData = z.infer<typeof postFormSchema>;

function EditPageSkeleton() {
  return (
    <div className="flex w-full flex-col items-center justify-center px-4 py-20 md:px-0">
      <div
        className="h-8 w-64 animate-pulse rounded-md"
        style={{ background: "var(--paper-2, #e5e5e5)" }}
      />
    </div>
  );
}

export default function PostEditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const postId = idParam && !Number.isNaN(Number(idParam)) ? Number(idParam) : undefined;

  const {
    data: postData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: postQueryKeys.detail(postId ?? -1),
    queryFn: () => httpService.get<IPost>(`/api/blogs/${postId}`),
    enabled: postId !== undefined,
  });

  useEffect(() => {
    // id가 없거나 숫자가 아니면 목록으로 되돌린다.
    if (!idParam || postId === undefined) {
      router.replace("/blogs");
    }
  }, [idParam, postId, router]);

  if (postId === undefined) {
    return null;
  }

  if (isLoading) {
    return <EditPageSkeleton />;
  }

  if (isError || !postData) {
    return (
      <div className="flex w-full flex-col items-center justify-center px-4 py-20 text-center md:px-0">
        <p className="text-gray-700 dark:text-gray-300">게시글을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return <PostEditForm postId={postId} postData={postData} />;
}

function PostEditForm({ postId, postData }: { postId: number; postData: IPost }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { mutate: editPost, data: mutationData } = useMutation({
    mutationFn: (payload: PostPostJson) =>
      httpService.post<{ ok: boolean }>(`/api/blogs/post/edit?id=${postId}`, payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: postQueryKeys.all }),
        queryClient.invalidateQueries({ queryKey: postQueryKeys.detail(postId) }),
      ]);
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: postData.title || "",
      description: postData.description || "",
      markdown: postData.content || "",
      tags: postData.tags?.map((item) => item.tag) || [],
      category: postData.category ? [postData.category] : [],
    },
  });

  const onSubmit = async (data: PostFormData) => {
    if (session?.user?.email !== process.env.MY_EMAIL) {
      if (process.env.NODE_ENV === "production") {
        return alert("email 확인해주세요");
      }
    }

    const postJson: PostPostJson = {
      ...data,
    };

    editPost(postJson);
  };

  useEffect(() => {
    if (mutationData?.ok) {
      router.replace("/");
    } else if (mutationData?.ok === false) {
      alert("인터넷 오류");
    }
  }, [mutationData, router]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="items-center justify-center flex flex-col px-4 md:px-0"
      >
        <div className="flex flex-wrap mt-5 gap-x-10 gap-y-5 mb-10 w-full max-w-4xl">
          <div className="w-full md:w-auto">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  id="title"
                  className="outline-none border-2 border-solid border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 p-2 rounded-md w-full"
                  type="text"
                  {...field}
                  required
                />
              )}
            />
            {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
          </div>

          <TagInput control={control} />
        </div>
        <div className="flex flex-wrap mt-5 gap-x-10 gap-y-5 mb-10 w-full max-w-4xl">
          <div className="w-full md:w-auto">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <input
                  id="description"
                  className="outline-none border-2 border-solid border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 p-2 rounded-md w-full"
                  type="text"
                  {...field}
                  required
                />
              )}
            />
            {errors.description && <p className="text-red-500 mt-1">{errors.description.message}</p>}
          </div>

          <CategoryInput control={control} />
        </div>

        <div
          data-color-mode="auto"
          className="w-full max-w-6xl"
        >
          <Controller
            name="markdown"
            control={control}
            render={({ field }) => (
              <MDEditor
                height={600}
                value={field.value}
                onChange={field.onChange}
                previewOptions={{
                  components: {
                    code: ({ children = [], className, ...props }) => {
                      if (
                        Array.isArray(children) &&
                        children.length > 0 &&
                        typeof children[0] === "string" &&
                        className?.startsWith("language-mermaid")
                      ) {
                        return <Mermaid chart={children[0]} />;
                      }
                      return (
                        <code
                          className={String(className)}
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                  },
                }}
              />
            )}
          />
          {errors.markdown && <p className="text-red-500 mt-1">{errors.markdown.message}</p>}
        </div>

        <button
          type="submit"
          className="text-center w-full max-w-xs my-10 ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-500 py-3 px-4 block hover:bg-gray-400 dark:hover:bg-gray-600 hover:text-white dark:text-gray-200 dark:hover:text-white rounded-md transition-colors duration-150"
        >
          Submit
        </button>
      </form>
    </>
  );
}
