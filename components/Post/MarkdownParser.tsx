"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { Url } from "url";

import { cls } from "@libs/client/utils";

export default function MarkdownParser({ markdown }: any) {
  // @ts-ignore
  return (
    <ReactMarkdown
      className="w-[80vw] text-gray-800 dark:text-[#E5E7EB]"
      components={{
        bdo: undefined,
        h1({ node, children, ...props }) {
          return (
            <h1
              {...props}
              className="text-black dark:text-white"
            >
              {children}
            </h1>
          );
        },
        h2({ node, children, ...props }) {
          return (
            <h2
              {...props}
              className="text-black dark:text-white"
            >
              {children}
            </h2>
          );
        },
        h3({ node, children, ...props }) {
          return (
            <h3
              {...props}
              className="text-black dark:text-white"
            >
              {children}
            </h3>
          );
        },
        h4({ node, children, ...props }) {
          return (
            <h4
              {...props}
              className="text-black dark:text-white"
            >
              {children}
            </h4>
          );
        },

        img({ node, ...props }) {
          return (
            <div className={"relative w-full h-80 my-10"}>
              <Image
                fill
                style={{ objectFit: "scale-down", objectPosition: "center" }}
                src={props?.src + ""}
                quality={100}
                alt="관련된 사진"
              />
            </div>
          );
        },
        p({ node, children, ...props }) {
          return (
            <div
              {...props}
              className="break-words my-4"
            >
              {children}
            </div>
          );
        },
        a({ node, children, ...props }) {
          return (
            <Link href={props.href as unknown as Url}>
              <span className="dark:text-white break-words">{children}</span>
            </Link>
          );
        },
        li({ node, children }) {
          return <li className="">{children}</li>;
        },
        span({ node, children, style }) {
          const backColor = `bg-[${style?.backgroundColor}]`;

          return <span className={cls("dark:text-white", backColor)}>{children}</span>;
        },
        strong({ node, className, children }) {
          return <strong className="dark:text-white">{children}</strong>;
        },
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return (
            <div>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <span className="bg-red-500 rounded-full w-3 h-3 mr-1"></span>
                <span className="bg-yellow-500 rounded-full w-3 h-3 mr-1"></span>
                <span className="bg-green-500 rounded-full w-3 h-3"></span>

                <span className={"ml-3"}>{match?.[1] ?? "text"}</span>
              </div>
              <SyntaxHighlighter
                style={darcula as Record<string, any>} // 스타일 타입 캐스팅
                language={match?.[1] ?? "plaintext"} // 기본 언어: "plaintext"
                showLineNumbers={true}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          );
        },
      }}
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
  );
}
