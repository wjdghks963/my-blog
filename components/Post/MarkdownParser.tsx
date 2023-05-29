'use client'

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {darcula} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { cls } from "@libs/client/utils";
import rehypeRaw from "rehype-raw";
import remarkAutolinkHeadings from 'remark-autolink-headings';
import remarkToc from 'remark-toc';
import remarkSlug from 'remark-slug';
import Image from "next/image";
import Link from "next/link";
import { Url } from "url";

export default function MarkdownParser({ markdown }: any) {
  return (
    <ReactMarkdown
      className="w-[80vw]"
      components={{
          bdo: undefined,
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
                   <div className={'relative w-full h-80 my-10'}>
                       <Image
                           fill
                           // width={300}
                           // height={300}
                           style={{objectFit: "scale-down",objectPosition:"center"}}
                           src={props?.src + ""}
                           quality={100}
                           alt="관련된 사진"
                       />
                   </div>
          );
        },
        p({ node, children, ...props }) {
          return (
            <p {...props} className="dark:text-white break-words">
              {children}
            </p>
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
          return <li className="dark:text-white">{children}</li>;
        },
        span({ node, children, style }) {
          const backColor = `bg-[${style?.backgroundColor}]`;

          return (
            <span className={cls("dark:text-white", backColor)}>
              {children}
            </span>
          );
        },
        strong({ node, className, children  }) {
          return <strong className="dark:text-white">{children}</strong>;
        },
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
              <div>

                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                      <span className="bg-red-500 rounded-full w-3 h-3 mr-1"></span>
                      <span className="bg-yellow-500 rounded-full w-3 h-3 mr-1"></span>
                      <span className="bg-green-500 rounded-full w-3 h-3"></span>

                      <span className={'ml-3'}>{match[1]}</span>
                  </div>

            <SyntaxHighlighter
              // eslint-disable-next-line react/no-children-prop
              children={String(children).replace(/\n$/, "")}
              style={darcula as any}
              language={match[1]}
              showLineNumbers
              {...props}
            />
              </div>
          ) : (
            <code
              className={cls(className ?? "", "dark:text-white")}
              {...props}
            >
              {children}
            </code>
          );
        }
      }}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm, remarkSlug,[remarkToc,{heading:"toc",nav:true, }], [remarkAutolinkHeadings,{}]]}
    >
        {markdown}
    </ReactMarkdown>
  );
}
