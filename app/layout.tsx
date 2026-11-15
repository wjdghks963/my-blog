import SiteShell from "@shared/components/shell/SiteShell";
import Provider from "@shared/components/Provider";
import JsonLd, { getOrganizationSchema, getWebSiteSchema } from "@shared/components/JsonLd";
import { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import React from "react";

import "@styles/globals.css";

// 본문·제목 공용: Pretendard Variable (한글/라틴 한 벌)
const sansFont = localFont({
  src: "../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-sans",
  weight: "45 920",
  display: "swap",
});

// 라벨·코드·숫자: Geist Mono
const monoFont = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jung's Tech Blog: Web Dev & Beyond",
  description:
    "프론트엔드 개발을 중심으로, 서버 인프라까지 다양한 기술 분야를 학습하고 다루는 최정환의 기술 블로그입니다.",
  openGraph: {
    title: "Jung's Tech Blog: Web Dev & Beyond",
    description:
      "프론트엔드 개발을 중심으로, 서버 인프라까지 다양한 기술 분야를 학습하고 다루는 최정환의 기술 블로그입니다.",
    url: "https://www.junglog.xyz",
    siteName: "Jung's Tech Blog",
    type: "website",
  },
  alternates: {
    canonical: "https://www.junglog.xyz",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      className={`${sansFont.variable} ${monoFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={getWebSiteSchema()} />
        <JsonLd data={getOrganizationSchema()} />
      </head>
      <body id="top" className="antialiased">
        <Provider>
          <SiteShell>{children}</SiteShell>
        </Provider>
      </body>
    </html>
  );
}
