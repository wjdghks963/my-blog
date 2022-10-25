import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { cls } from "@libs/client/utils";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import Link from "next/link";
import { Url } from "url";

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

        img({ node, ...props }) {
          return (
            <Image
              className=""
              src={props?.src + ""}
              layout="responsive"
              width={100}
              height={100}
              priority={true}
              alt="/favicon.ico"
            />
          );
        },
        p({ node, children, ...props }) {
          return (
            <div {...props} className="dark:text-white">
              {children}
            </div>
          );
        },
        a({ node, children, ...props }) {
          return (
            <Link href={props.href as unknown as Url}>
              <a className="dark:text-white break-words">{children}</a>
            </Link>
          );
        },
        li({ node, children, ...props }) {
          return <li className="dark:text-white">{children}</li>;
        },
        span({ node, children, style, ...props }) {
          const backColor = `bg-[${style?.backgroundColor}]`;

          return (
            <span className={cls("dark:text-white", backColor)}>
              {children}
            </span>
          );
        },
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              // eslint-disable-next-line react/no-children-prop
              children={String(children).replace(/\n$/, "")}
              style={dark as any}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code
              className={cls(className ? className : "", "dark:text-white")}
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
    >
      {markdown}
    </ReactMarkdown>
  );
}
