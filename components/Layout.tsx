import React from "react";
import Header from "@components/Header";
import SEO, { ISEO } from "@components/SEO";
import Footer from "./Footer";

interface ILayout extends ISEO {
  children: React.ReactNode;
  footer?: boolean;
  keywords?: string;
}

export default function Layout({
  children,
  title,
  url,
  description,
  image,
  footer,
  keywords,
}: ILayout) {
  return (
    <>
      <SEO
        title={title}
        url={url}
        description={description}
        image={image}
        keywords={keywords}
      />
      <div className="flex flex-col h-screen">
        <Header />
        <div className="grow">{children}</div>
        {footer === false ? "" : <Footer />}
      </div>
    </>
  );
}
