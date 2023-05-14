import React from "react";
import Header from "@components/Base/Header";
import SEO, { ISEO } from "@components/Base/SEO";
import Footer from "./Footer";
import { cls } from "@libs/client/utils";

interface ILayout extends ISEO {
  children: React.ReactNode;
  footer?: boolean;
  keywords?: string;
  className?: string;
}

export default function Layout({
  children,
  title,
  url,
  description,
  image,
  footer,
  keywords,
  className,
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
      <div
        className={cls(className ?? "", "flex flex-col h-screen")}
      >
          <Header />
        <div className="grow flex flex-col">
            {children}
        </div>
            {footer === false ? "" : <Footer />}

      </div>
    </>
  );
}
