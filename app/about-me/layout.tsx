import JsonLd, { getBreadcrumbSchema, getProfilePageSchema, SITE_CONFIG } from "@shared/components/JsonLd";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About Me - 최정환 | Web Developer",
  description: "새로운 도전과 내실 다지기를 즐기는 웹 개발자 최정환입니다. Next.js, React Native, Spring Boot 등을 활용한 풀스택 개발 경험을 보유하고 있습니다.",
  openGraph: {
    title: "About Me - 최정환",
    description: "새로운 도전과 내실 다지기를 즐기는 웹 개발자 최정환입니다.",
    url: `${SITE_CONFIG.url}/about-me`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/about-me`,
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

export default function AboutMeLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "홈", url: SITE_CONFIG.url },
    { name: "About Me", url: `${SITE_CONFIG.url}/about-me` },
  ]);

  return (
    <>
      <JsonLd data={getProfilePageSchema()} />
      <JsonLd data={breadcrumbSchema} />
      {children}
    </>
  );
}
