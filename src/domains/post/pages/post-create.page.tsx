"use client";

import CategoryInput from "@domains/post/components/CategoryInput";
import ImageForm from "@domains/post/components/ImageForm";
import { Mermaid } from "@domains/post/components/Mermaid";
import TagInput from "@domains/post/components/TagInput";
import { PostPostJson } from "@domains/post/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@shared/hooks/useMutation";
import { MutationResult } from "@shared/types/common.types";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const postFormSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요."),
  description: z.string().min(1, "게시글 요약을 입력해주세요."),
  markdown: z.string().min(1, "내용을 입력해주세요."),
  tags: z.array(z.string()).max(5, "태그는 최대 5개까지 선택할 수 있습니다."),
  category: z.array(z.string()).min(0, "카테고리는 최소 1개 이상 선택해주세요."),
});

type PostFormData = z.infer<typeof postFormSchema>;

export default function PostCreatePage() {
  const router = useRouter();
  const [postBlog, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation<MutationResult>(process.env.NEXT_PUBLIC_APIDOMAIN + "/api/blogs/post");
  const { data: session } = useSession();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      description: "",
      markdown: "",
      tags: [],
      category: [],
    },
  });

  const onSubmit = (data: PostFormData) => {
    if (session?.user?.email !== process.env.MY_EMAIL) {
      if (process.env.NODE_ENV === "production") {
        alert("이메일을 확인해주세요.");
        return;
      }
    }

    const postJson: PostPostJson = {
      ...data,
      category: data.category,
    };

    try {
      postBlog(postJson);
    } catch (err) {
      console.error("게시글 작성 중 오류 발생:", err);
      alert("게시글 작성 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (mutationData) {
      if (mutationData.ok) {
        router.replace("/");
      } else {
        let errorMessage = "게시글 작성에 실패했습니다. 다시 시도해주세요.";
        alert(errorMessage);
      }
    } else if (mutationError) {
      let errorMessage = "게시글 작성에 실패했습니다. 다시 시도해주세요.";
      if (mutationError instanceof Error) {
        errorMessage = mutationError.message;
      } else if (
        typeof mutationError === "object" &&
        mutationError !== null &&
        "message" in mutationError &&
        typeof (mutationError as any).message === "string"
      ) {
        errorMessage = (mutationError as any).message;
      }
      alert(errorMessage);
    }
  }, [mutationData, mutationError, router]);

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
            <input
              id="title"
              className="outline-none border-2 border-solid border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 p-2 rounded-md w-full"
              type="text"
              {...control.register("title")}
              required
              placeholder="제목을 입력하세요"
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
            <input
              id="description"
              className="outline-none border-2 border-solid border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 p-2 rounded-md w-full"
              type="text"
              {...control.register("description")}
              placeholder="게시글 요약을 입력하세요"
              required
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
                      if (typeof children[0] === "string" && className?.startsWith("language-mermaid")) {
                        return <Mermaid chart={children[0]} />;
                      }
                      // 다른 언어의 코드 블록은 MDEditor의 기본 렌더링을 따릅니다.
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
          disabled={mutationLoading}
          className="text-center w-full max-w-xs my-10 ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-500 py-3 px-4 block hover:bg-gray-400 dark:hover:bg-gray-600 hover:text-white dark:text-gray-200 dark:hover:text-white rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mutationLoading ? "작성 중..." : "Submit"}
        </button>
      </form>

      {session?.user?.email === process.env.MY_EMAIL && <ImageForm />}
    </>
  );
}
