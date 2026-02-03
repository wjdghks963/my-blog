import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Note | Jung's Tech Blog",
  description: "블로그 업데이트 내역을 확인할 수 있는 페이지입니다.",
  openGraph: {
    title: "Update Note | Jung's Tech Blog",
    description: "블로그 업데이트 내역을 확인할 수 있는 페이지입니다.",
    url: "https://www.junglog.xyz/update-note",
    type: "website",
  },
  alternates: {
    canonical: "https://www.junglog.xyz/update-note",
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

export default function UpdateNoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
