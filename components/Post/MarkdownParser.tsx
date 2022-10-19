import React, { CSSProperties } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

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

        p({ node, children, ...props }) {
          return (
            <p {...props} className="dark:text-white">
              {children}
            </p>
          );
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
              // eslint-disable-next-line react/no-children-prop
              children={String(children).replace(/\n$/, "")}
              style={dark as any}
              language="javascript"
              PreTag="div"
              {...props}
            />
          );
        },
      }}
      remarkPlugins={[remarkGfm]}
    >
      {markdown}
    </ReactMarkdown>
  );
}
