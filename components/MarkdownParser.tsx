import React, { useRef, useState } from "react";
import { useMutation } from "@libs/client/useMutation";
import { useRouter } from "next/router";
import Layout from "@components/Layout";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { IPost } from "pages/api/blogs/[id]";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";

export default function MarkdownParser({ markdown }: any) {
  return (
    <ReactMarkdown
      components={{
        h1({ node, children, ...props }) {
          return (
            <h1 {...props} className="dark:text-white">
              {children}
            </h1>
          );
        },
        h2({ node, children, ...props }) {
          return (
            <h2 {...props} className="dark:text-white">
              {children}
            </h2>
          );
        },
        h3({ node, children, ...props }) {
          return (
            <h3 {...props} className="dark:text-white">
              {children}
            </h3>
          );
        },
        h4({ node, children, ...props }) {
          return (
            <h4 {...props} className="dark:text-white">
              {children}
            </h4>
          );
        },
        h5({ node, children, ...props }) {
          return (
            <h5 {...props} className="dark:text-white">
              {children}
            </h5>
          );
        },
        p({ node, children, ...props }) {
          return (
            <p {...props} className="dark:text-white">
              {children}
            </p>
          );
        },
        br({ node }) {
          return <br />;
        },
        hr({}) {
          return <hr />;
        },
        li({ node, children, ...props }) {
          return (
            <li {...props} className="dark:text-white">
              {children}
            </li>
          );
        },
        span({ node, children, ...props }) {
          return (
            <span className="dark:text-white" {...props}>
              {children}
            </span>
          );
        },
        code({ node, inline, className, children, ...props }) {
          return (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              language="javascript"
              PreTag="div"
              {...props}
            />
          );
        },
      }}
      remarkPlugins={[remarkGfm]}
    >
      {/* {postData.content} */}
      {markdown}
    </ReactMarkdown>
  );
}
