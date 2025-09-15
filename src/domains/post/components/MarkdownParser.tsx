"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { Url } from "url";

import ImageLightbox from "../../../shared/components/ImageLightbox";
import { Mermaid } from "./Mermaid";

export default function MarkdownParser({ markdown }: any) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState<string>("관련된 사진");

  const openLightbox = useCallback((src: string, alt?: string) => {
    setLightboxSrc(src);
    if (alt) setLightboxAlt(alt);
    setIsLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setLightboxSrc(null);
  }, []);

  return (
    <div className="w-[80vw] text-gray-900 dark:text-gray-100">
      <ReactMarkdown
        components={
          {
            bdo: undefined,
            h1({ node, children, ...props }: any) {
              return (
                <h1
                  {...props}
                  className="text-black dark:text-white"
                >
                  {children}
                </h1>
              );
            },
            h2({ node, children, ...props }: any) {
              return (
                <h2
                  {...props}
                  className="text-black dark:text-white"
                >
                  {children}
                </h2>
              );
            },
            h3({ node, children, ...props }: any) {
              return (
                <h3
                  {...props}
                  className="text-black dark:text-white"
                >
                  {children}
                </h3>
              );
            },
            h4({ node, children, ...props }: any) {
              return (
                <h4
                  {...props}
                  className="text-black dark:text-white"
                >
                  {children}
                </h4>
              );
            },
            th({ node, children, ...props }: any) {
              return (
                <th
                  {...props}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white font-semibold"
                >
                  {children}
                </th>
              );
            },
            img({ node, ...props }: any) {
              const src = String(props?.src ?? "");
              const alt = String(props?.alt ?? "관련된 사진");
              return (
                <div className="my-10">
                  <button
                    type="button"
                    onClick={() => openLightbox(src, alt)}
                    className="group relative w-full h-80 cursor-zoom-in"
                    aria-label="이미지 확대"
                    title="이미지 클릭으로 확대"
                  >
                    <Image
                      fill
                      style={{ objectFit: "scale-down", objectPosition: "center" }}
                      src={src}
                      quality={100}
                      alt={alt}
                    />
                    {/* affordance: magnifier icon */}
                    <div className="pointer-events-none absolute top-2 right-2 opacity-60 md:opacity-0 md:group-hover:opacity-90 transition-opacity">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                        aria-hidden
                      >
                        <path d="M10.5 3a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm9.78 14.22-3.25-3.25a1 1 0 1 0-1.41 1.41l3.25 3.25a1 1 0 0 0 1.41-1.41Z" />
                      </svg>
                    </div>
                  </button>
                </div>
              );
            },
            p({ node, children, ...props }: any) {
              return (
                <div
                  {...props}
                  className="break-words my-4"
                >
                  {children}
                </div>
              );
            },
            a({ node, children, ...props }: any) {
              return (
                <Link href={props.href as unknown as Url}>
                  <span className="dark:text-white break-words">{children}</span>
                </Link>
              );
            },
            li({ node, children }: any) {
              return <li className="">{children}</li>;
            },
            span({ node, children, style }: any) {
              return (
                <span
                  className="dark:text-black"
                  style={{ color: style?.color, backgroundColor: style?.backgroundColor }}
                >
                  {children}
                </span>
              );
            },
            strong({ node, children }: any) {
              return (
                <strong
                  className="font-bold"
                  style={{ color: "inherit" }}
                >
                  {children}
                </strong>
              );
            },
            code({ node, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || "");
              const lang = match?.[1];

              if (lang === "mermaid") {
                return <Mermaid chart={String(children).replace(/\n$/, "")} />;
              }

              if (lang) {
                return (
                  <div>
                    <div style={{ display: "flex", justifyContent: "flex-start" }}>
                      <span className="bg-red-500 rounded-full w-3 h-3 mr-1"></span>
                      <span className="bg-yellow-500 rounded-full w-3 h-3 mr-1"></span>
                      <span className="bg-green-500 rounded-full w-3 h-3"></span>
                      <span className={"ml-3"}>{match?.[1] ?? "text"}</span>
                    </div>
                    <SyntaxHighlighter
                      style={darcula as Record<string, any>}
                      language={match?.[1] ?? "plaintext"}
                      showLineNumbers={true}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
                );
              } else {
                return <span className="bg-amber-100 text-black">{children}</span>;
              }
            },
          } as any
        }
        rehypePlugins={[
          rehypeSlug,
          rehypeRaw,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
            },
          ],
        ]}
        remarkPlugins={[remarkGfm, [remarkToc, { heading: "toc", nav: true }]]}
      >
        {markdown}
      </ReactMarkdown>

      {isLightboxOpen && lightboxSrc && (
        <ImageLightbox
          open={isLightboxOpen}
          src={lightboxSrc}
          alt={lightboxAlt}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}
