import React from "react";
import Header from "@components/Header";
import SEO, { ISEO } from "@components/SEO";

interface ILayout extends ISEO {
  children: React.ReactNode;
}

export default function Layout({
  children,
  title,
  url,
  description,
  image,
}: ILayout) {
  return (
    <>
      <SEO title={title} url={url} description={description} image={image} />
      <div className="flex flex-col">
        <Header />
        {children}
      </div>
    </>
  );
}
