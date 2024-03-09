import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import React from "react";

import SlideHeaderNavBar from "@components/Base/NavBar/SlideHeaderNavBar";
import Provider from "@components/Provider";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Jung Blog",
  description: "기술 블로그",
  openGraph: {
    title: "Jung Blog",
    description: "기술 블로그",
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
