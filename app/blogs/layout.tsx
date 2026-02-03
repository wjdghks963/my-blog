import { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그 목록 | Jung's Tech Blog",
  description: "프론트엔드 개발을 중심으로, 서버 인프라까지 다양한 기술 분야를 학습하고 다루는 최정환의 기술 블로그입니다.",
  openGraph: {
    title: "블로그 목록 | Jung's Tech Blog",
    description: "프론트엔드 개발을 중심으로, 서버 인프라까지 다양한 기술 분야를 학습하고 다루는 최정환의 기술 블로그입니다.",
    url: "https://www.junglog.xyz/blogs",
    type: "website",
  },
  alternates: {
    canonical: "https://www.junglog.xyz/blogs",
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

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
