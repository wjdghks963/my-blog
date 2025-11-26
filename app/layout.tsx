import SlideHeaderNavBar from "@shared/components/NavBar/SlideHeaderNavBar";
import Provider from "@shared/components/Provider";
import JsonLd, { getOrganizationSchema, getWebSiteSchema } from "@shared/components/JsonLd";
import { Metadata } from "next";
import React from "react";

import "@styles/globals.css";

export const metadata: Metadata = {
  title: "Jung's Tech Blog: Web Dev & Beyond",
  description:
    "프론트엔드 개발을 중심으로, 서버 인프라까지 다양한 기술 분야를 학습하고 다루는 최정환의 기술 블로그입니다.",
  openGraph: {
    title: "Jung Blog",
    description:
      "프론트엔드 개발을 중심으로, 서버 인프라까지 다양한 기술 분야를 학습하고 다루는 최정환의 기술 블로그입니다.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={getWebSiteSchema()} />
        <JsonLd data={getOrganizationSchema()} />
      </head>
      <body>
        <Provider>
          <SlideHeaderNavBar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
