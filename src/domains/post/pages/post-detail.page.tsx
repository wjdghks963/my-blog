import TableOfContents from "@domains/post/components/MarkdownContentTable";
import MarkdownParser from "@domains/post/components/MarkdownParser";
import PostEditDeleteBox from "@domains/post/components/PostEditDeleteBox";
import { IPost } from "@domains/post/types";
import TagSpan from "@shared/components/TagSpan";
import compareLocaleDate from "@shared/utils/CompareLocaleDate";
import { getReadingTime } from "@shared/utils/utils";
import { notFound } from "next/navigation";

import { getAllPostId } from "@libs/server/getAllPostId";

type Props = {
  postData: IPost;
};

export default function PostDetailPage({ postData }: Props) {
  if (!postData) {
    notFound();
  }

  const tags = postData.tags?.map((tag) => tag.tag) ?? [];
  const date = compareLocaleDate(postData.createdAt!, postData.updatedAt!);
  const readingTime = getReadingTime(postData.content);

  return (
    <main className="min-h-screen pb-16 pt-16">
      <div className="page-shell">
        <article className="surface-card p-5 mobile:p-8">
          <header className="border-b border-soft pb-6">
            <div className="flex flex-col gap-4 mobile:flex-row mobile:items-start mobile:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                  <span>{date}</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--text-muted)]" />
                  <span>조회 {postData.views}</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--text-muted)]" />
                  <span>{readingTime}분 읽기</span>
                </div>
                {postData.category ? <span className="text-sm text-muted">카테고리: {postData.category}</span> : null}
              </div>

              <div className="flex flex-row flex-wrap justify-start gap-2 mobile:max-w-[45%] mobile:justify-end">
                {tags.map((tag, index: number) => (
                  <TagSpan
                    key={index}
                    tag={tag}
                    clickOk={true}
                    goBlog={true}
                  />
                ))}
              </div>
            </div>

            <h1 className="mt-6 text-3xl mobile:text-5xl font-bold leading-tight text-[var(--text-primary)]">{postData.title}</h1>
          </header>

          <section className="mt-10">
            <MarkdownParser markdown={postData.content} />
          </section>
        </article>

        <TableOfContents markdown={postData.content} />

        <PostEditDeleteBox postData={postData} />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const { postsId } = await getAllPostId();
  return postsId.map((item: { id: number }) => ({ id: item.id + "" }));
}
