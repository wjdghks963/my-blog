import PostDetailPage from "@domains/post/pages/post-detail.page";

export default function Page({ params }: { params: { id: string } }) {
  // @ts-ignore
  return <PostDetailPage params={params} />;
}
