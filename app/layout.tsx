import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import React from "react";

import SlideHeaderNavBar from "@components/Base/NavBar/SlideHeaderNavBar";
import Provider from "@components/Provider";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Jung’s Tech Blog: Web Dev & Beyond",
  description:
    "JavaScript 프론트엔드 개발을 중심으로, Java와 서버 인프라까지 다양한 기술 분야를 학습하고 다루는 최정환의 기술 블로그입니다. 최신 웹 개발 트렌드와 실전 팁을 만나보세요.",
  openGraph: {
    title: "Jung Blog",
    description:
      "JavaScript 프론트엔드 개발을 중심으로, Java와 서버 인프라까지 다양한 기술 분야를 학습하고 다루는 최정환의 기술 블로그입니다. 최신 웹 개발 트렌드와 실전 팁을 만나보세요.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Provider>
          <SlideHeaderNavBar />
          {children}
        </Provider>
        <Analytics />
      </body>
    </html>
  );
}
