import { IAdjacentPost } from "@domains/post/types";
import Link from "next/link";

type Props = {
  prevPost?: IAdjacentPost | null;
  nextPost?: IAdjacentPost | null;
};

export default function PostNeighborNav({ prevPost, nextPost }: Props) {
  if (!prevPost && !nextPost) return null;

  return (
    <nav
      className="grid gap-6 sm:grid-cols-2"
      style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid var(--rule)" }}
    >
      {prevPost ? <NeighborLink post={prevPost} label="← 이전 글" /> : <div />}
      {nextPost && <NeighborLink post={nextPost} label="다음 글 →" align="right" />}
    </nav>
  );
}

function NeighborLink({
  post,
  label,
  align = "left",
}: {
  post: IAdjacentPost;
  label: string;
  align?: "left" | "right";
}) {
  return (
    <Link
      href={`/blogs/post/${post.id}`}
      prefetch={false}
      className="group block"
      style={{ textAlign: align }}
    >
      <div className="tiny-label" style={{ color: "var(--ink-3)", marginBottom: 8 }}>
        {label}
      </div>
      <div
        className="font-serif group-hover:underline"
        style={{
          fontSize: 18,
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
          fontWeight: 500,
          color: "var(--ink)",
          textDecorationThickness: 1,
        }}
      >
        {post.title}
      </div>
    </Link>
  );
}
