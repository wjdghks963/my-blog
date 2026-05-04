import EditorialToc from "@domains/post/components/EditorialToc";
import MarkdownParser from "@domains/post/components/MarkdownParser";
import PostEditDeleteBox from "@domains/post/components/PostEditDeleteBox";
import ReadingProgressBar from "@domains/post/components/ReadingProgressBar";
import { IPost } from "@domains/post/types";
import { categoryColor } from "@domains/home/utils/categoryColor";
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
  const catColor = categoryColor(postData.category);

  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <ReadingProgressBar />

      <div
        className="mx-auto grid gap-8 px-6 py-12 mobile:px-14 lg:grid-cols-[200px_minmax(0,680px)_220px] lg:justify-center"
      >
        {/* Left meta column */}
        <aside style={{ alignSelf: "start" }} className="hidden lg:block">
          <div className="tiny-label" style={{ color: "var(--ink-3)", marginBottom: 8 }}>
            이 글
          </div>
          <div
            style={{
              borderTop: "2px solid var(--ink)",
              paddingTop: 12,
              display: "grid",
              gap: 10,
              fontSize: 12,
            }}
          >
            {postData.category && (
              <MetaRow
                k="카테고리"
                v={
                  <span style={{ color: catColor, fontWeight: 600 }}>{postData.category}</span>
                }
              />
            )}
            <MetaRow k="발행" v={date} />
            <MetaRow k="읽기" v={`${readingTime}분`} />
            <MetaRow k="조회" v={postData.views.toLocaleString()} />
          </div>

          {tags.length > 0 && (
            <div style={{ marginTop: 28 }}>
              <div className="tiny-label" style={{ color: "var(--ink-3)", marginBottom: 10 }}>
                태그
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <Link
                    key={t}
                    href={`/blogs?tag=${encodeURIComponent(t)}`}
                    className="font-mono"
                    style={{
                      fontSize: 10.5,
                      color: "var(--ink-3)",
                      padding: "2px 6px",
                      border: "1px solid var(--rule)",
                      borderRadius: 2,
                    }}
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Article body */}
        <article style={{ minWidth: 0 }}>
          {postData.category && (
            <div
              className="tiny-label"
              style={{ color: catColor, fontWeight: 600, marginBottom: 14 }}
            >
              {postData.category}
            </div>
          )}
          <h1
            className="font-serif"
            style={{
              margin: 0,
              fontSize: "clamp(32px, 5vw, 48px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 500,
              color: "var(--ink)",
            }}
          >
            {postData.title}
          </h1>
          {postData.description && (
            <p
              className="font-serif"
              style={{
                margin: "16px 0 28px",
                fontSize: 21,
                lineHeight: 1.4,
                fontStyle: "italic",
                color: "var(--ink-2)",
                fontWeight: 300,
              }}
            >
              {postData.description}
            </p>
          )}

          <div
            className="flex flex-wrap items-center gap-3"
            style={{
              paddingBottom: 24,
              borderBottom: "1px solid var(--rule)",
              marginBottom: 32,
              fontSize: 12,
              color: "var(--ink-3)",
            }}
          >
            <span style={{ color: "var(--ink-2)", fontWeight: 600 }}>최정환</span>
            <span>·</span>
            <span>{date}</span>
            <span>·</span>
            <span>{readingTime}분 읽기</span>
            <span style={{ marginLeft: "auto" }} className="font-mono">
              {postData.views.toLocaleString()} views
            </span>
          </div>

          <div className="markdown-content editorial-body">
            <MarkdownParser markdown={postData.content} />
          </div>
        </article>

        {/* Right TOC column */}
        <div className="hidden lg:block">
          <EditorialToc markdown={postData.content} />
        </div>
      </div>

      <PostEditDeleteBox postData={postData} />
    </main>
  );
}

function MetaRow({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex justify-between" style={{ fontSize: 12 }}>
      <span style={{ color: "var(--ink-3)" }}>{k}</span>
      <span style={{ color: "var(--ink)", fontWeight: 500 }}>{v}</span>
    </div>
  );
}

export async function generateStaticParams() {
  const { postsId } = await getAllPostId();
  return postsId.map((item: { id: number }) => ({ id: item.id + "" }));
}
