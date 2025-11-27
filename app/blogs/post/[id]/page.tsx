import PostDetailPage from "@domains/post/pages/post-detail.page";
import { IPost } from "@domains/post/types";
import JsonLd, { getBlogPostingSchema, getBreadcrumbSchema, SITE_CONFIG } from "@shared/components/JsonLd";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import process from "process";

import { RegImageSrc } from "@libs/server/RegImageSrc";
import { getAllPostId } from "@libs/server/getAllPostId";

export const revalidate = 60;

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function fetchData(id: string): Promise<IPost | undefined> {
  try {
    // 서버에서는 절대 URL이 필요
    const baseUrl = process.env.NEXT_PUBLIC_APIDOMAIN;
    const res = await fetch(`${baseUrl}/api/blogs/${id}`, { next: { tags: ["posts"] } });
    console.log("BLOGS POST RES", res);
    if (!res.ok) {
      console.error("Failed to fetch data:", res.status, res.statusText);
      return undefined;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return undefined;
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const { id } = params;

  const data: IPost | undefined = await fetchData(id);
  if (!data) {
    notFound();
  }

  const ImageSrc = RegImageSrc(data?.content);

  const openGraph: Metadata["openGraph"] = {
    title: data.title,
    description: data.description,
  };

  if (ImageSrc) {
    const ogImageUrl = ImageSrc.startsWith("http") ? ImageSrc : `${process.env.NEXT_PUBLIC_APIDOMAIN}${ImageSrc}`;
    openGraph.images = [
      {
        url: ogImageUrl,
        alt: `${data.title}과 관련된 사진`,
      },
    ];
  }

  return {
    title: data.title,
    description: data.description,
    openGraph,
  };
}

// only run at build time
export async function generateStaticParams() {
  const { postsId } = await getAllPostId();
  return postsId.map((item: { id: number }) => ({ id: item.id + "" }));
}

export default async function Page(props: Props) {
  const params = await props.params;

  const { id } = params;

  const postData = await fetchData(id);

  if (!postData) {
    notFound();
  }

  const postUrl = `${SITE_CONFIG.url}/blogs/post/${id}`;
  const imageSrc = RegImageSrc(postData.content);
  const ogImageUrl = imageSrc
    ? imageSrc.startsWith("http")
      ? imageSrc
      : `${process.env.NEXT_PUBLIC_APIDOMAIN}${imageSrc}`
    : undefined;

  const blogPostingSchema = getBlogPostingSchema({
    title: postData.title,
    description: postData.description,
    content: postData.content,
    datePublished: new Date(postData.createdAt).toISOString(),
    dateModified: new Date(postData.updatedAt).toISOString(),
    url: postUrl,
    image: ogImageUrl,
    category: postData.category ?? undefined,
    tags: postData.tags?.map((tag) => tag.tag),
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "홈", url: SITE_CONFIG.url },
    { name: "블로그", url: `${SITE_CONFIG.url}/blogs` },
    { name: postData.title, url: postUrl },
  ]);

  return (
    <>
      <JsonLd data={blogPostingSchema} />
      <JsonLd data={breadcrumbSchema} />
      <PostDetailPage postData={postData} />
    </>
  );
}
