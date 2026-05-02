import TableOfContents from "@domains/post/components/MarkdownContentTable";
import MarkdownParser from "@domains/post/components/MarkdownParser";
import PostEditDeleteBox from "@domains/post/components/PostEditDeleteBox";
import { IPost } from "@domains/post/types";
import TagSpan from "@shared/components/TagSpan";
import compareLocaleDate from "@shared/utils/CompareLocaleDate";
import { getReadingTime } from "@shared/utils/utils";
import Link from "next/link";
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
    <main className="min-h-screen pb-20">
      <article>
        <header className="border-b-[1.5px] border-ink">
          <div className="page-shell pt-10 mobile:pt-14">
            <div className="flex items-baseline justify-between gap-4 font-display text-[11px] font-bold uppercase tracking-[0.28em] text-muted">
              <Link
                href="/blogs"
                className="underline underline-offset-[6px] decoration-[1.5px]"
              >
                ← Archive
              </Link>
              <span>
                {postData.category ? `${postData.category} · ` : ""}
                {date}
              </span>
            </div>

            <hr className="rule-thick mt-3" />

            <h1 className="mt-8 display-headline text-3xl font-bold leading-[0.96] mobile:text-5xl lg:text-6xl">
              {postData.title}
            </h1>

            {postData.description && (
              <p className="mt-6 max-w-3xl text-base text-ink-soft mobile:text-lg">
                {postData.description}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-soft pt-4 pb-8">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-display text-[11px] font-bold uppercase tracking-[0.28em] text-muted">
                <span>{readingTime} min read</span>
                <span>{postData.views.toLocaleString()} reads</span>
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index: number) => (
                    <TagSpan
                      key={index}
                      tag={tag}
                      clickOk={true}
                      goBlog={true}
                      className="pill"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="page-shell pt-10">
          <section className="mx-auto max-w-3xl">
            <MarkdownParser markdown={postData.content} />
          </section>
        </div>
      </article>

      <TableOfContents markdown={postData.content} />

      <PostEditDeleteBox postData={postData} />
    </main>
  );
}

export async function generateStaticParams() {
  const { postsId } = await getAllPostId();
  return postsId.map((item: { id: number }) => ({ id: item.id + "" }));
}
