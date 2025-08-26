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

import { Mermaid } from "./Mermaid";

interface MarkdownParserProps {
  markdown: string;
}

interface MarkdownComponentProps {
  node?: any;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  src?: string;
  alt?: string;
  [key: string]: any;
}

export default function MarkdownParser({ markdown }: MarkdownParserProps) {
  return (
    <div className="w-[80vw] text-gray-900 dark:text-gray-100">
      <ReactMarkdown
        components={{
          bdo: undefined,
          h1({ node, children, ...props }: MarkdownComponentProps) {
            return (
              <h1
                {...props}
                className="text-black dark:text-white"
              >
                {children}
              </h1>
            );
          },
          h2({ node, children, ...props }: MarkdownComponentProps) {
            return (
              <h2
                {...props}
                className="text-black dark:text-white"
              >
                {children}
              </h2>
            );
          },
          h3({ node, children, ...props }: MarkdownComponentProps) {
            return (
              <h3
                {...props}
                className="text-black dark:text-white"
              >
                {children}
              </h3>
            );
          },
          h4({ node, children, ...props }: MarkdownComponentProps) {
            return (
              <h4
                {...props}
                className="text-black dark:text-white"
              >
                {children}
              </h4>
            );
          },
          th({ node, children, ...props }: MarkdownComponentProps) {
            return (
              <th
                {...props}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white font-semibold"
              >
                {children}
              </th>
            );
          },
          img({ node, ...props }: MarkdownComponentProps) {
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
          p({ node, children, ...props }: MarkdownComponentProps) {
            return (
              <div
                {...props}
                className="break-words my-4"
              >
                {children}
              </div>
            );
          },
          a({ node, children, ...props }: MarkdownComponentProps) {
            return <Link href={props.href as unknown as Url}>{children}</Link>;
          },
          li({ node, children }: MarkdownComponentProps) {
            return <li>{children}</li>;
          },
          span({ node, children, style }: MarkdownComponentProps) {
            return (
              <span
                style={style}
                className="text-black dark:text-white"
              >
                {children}
              </span>
            );
          },
          strong({ node, children }: MarkdownComponentProps) {
            return <strong className="text-black dark:text-white font-bold">{children}</strong>;
          },
          code({ node, className, children, ...props }: MarkdownComponentProps) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...props}
                PreTag="div"
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={darcula}
              />
            ) : (
              <code
                {...props}
                className={className}
              >
                {children}
              </code>
            );
          },
        }}
        remarkPlugins={[remarkGfm, remarkToc]}
        rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
