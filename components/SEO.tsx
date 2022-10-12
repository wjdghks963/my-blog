import Head from "next/head";

export interface ISEO {
  title: string;
  description?: string;
  url: string;
  image?: string;
  keywords?: string;
}

// TODO:: 나중에 url meta 바꿔야함
const SEO = ({ title, description, url, image, keywords }: ISEO) => {
  return (
    <Head>
      <title>{title || "jung의 블로그"}</title>
      <meta charSet="UTF-8" />
      <meta name="description" content={description || "jung의 블로그"} />
      <meta name="keywords" content={keywords || ""} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="author" content="Jung" />
      <meta name="og:site_name" content="jung의 블로그" />
      <meta property="og:title" content={title || "jung의 블로그"} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || "https://"} />
      <meta property="og:image" content={image} />
      <meta
        property="og:description"
        content={description || "jung의 블로그"}
      />
      <meta property="og:article:author" content="jung" />
    </Head>
  );
};

export default SEO;