import PostLayout from "@domains/post/layouts/post.layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PostLayout>{children}</PostLayout>;
}
