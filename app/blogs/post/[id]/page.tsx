import PostDetailPage from "@domains/post/pages/post-detail.page";
import { IPost } from "@domains/post/types";
import JsonLd, { getBlogPostingSchema, getBreadcrumbSchema, SITE_CONFIG } from "@shared/components/JsonLd";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import { RegImageSrc } from "@libs/server/RegImageSrc";
import { getApiBaseUrl } from "@libs/server/getApiBaseUrl";
import { getAllPostId } from "@libs/server/getAllPostId";

export const revalidate = 60;

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const fetchData = cache(async (id: string): Promise<IPost | undefined> => {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/api/blogs/${id}`, { next: { tags: ["posts"] } });
    if (!res.ok) {
      console.error("Failed to fetch data:", res.status, res.statusText);
      return undefined;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return undefined;
  }
});

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
    const ogImageUrl = ImageSrc.startsWith("http") ? ImageSrc : `${getApiBaseUrl()}${ImageSrc}`;
    openGraph.images = [
      {
        url: ogImageUrl,
        alt: `${data.title}과 관련된 사진`,
      },
    ];
  }

  const canonicalUrl = `https://www.junglog.xyz/blogs/post/${id}`;

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      ...openGraph,
      url: canonicalUrl,
      type: "article",
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
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
      : `${getApiBaseUrl()}${imageSrc}`
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
