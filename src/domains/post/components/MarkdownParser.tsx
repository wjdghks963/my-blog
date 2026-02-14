"use client";

import ImageLightbox from "@shared/components/ImageLightbox";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";

import { Mermaid } from "./Mermaid";

type MarkdownParserProps = {
  markdown: string;
};

function extractCodeText(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map((child) => extractCodeText(child)).join("");
  }

  if (React.isValidElement(children)) {
    const props = children.props as { children?: React.ReactNode } | undefined;
    return extractCodeText(props?.children ?? "");
  }

  return "";
}

function extractLanguageFromPre(children: React.ReactNode): string {
  const firstChild = Array.isArray(children) ? children[0] : children;

  if (!React.isValidElement(firstChild)) {
    return "text";
  }

  const className = ((firstChild.props as { className?: string } | undefined)?.className ?? "").toString();
  const match = /language-([\w-]+)/.exec(className);
  return match?.[1] ?? "text";
}

export default function MarkdownParser({ markdown }: MarkdownParserProps) {
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
    <div className="markdown-content w-full text-[var(--text-primary)]">
      <ReactMarkdown
        components={{
          bdo: undefined,
          h1({ children, ...props }) {
            return (
              <h1
                {...props}
                className="mt-8 text-3xl font-bold"
              >
                {children}
              </h1>
            );
          },
          h2({ children, ...props }) {
            return (
              <h2
                {...props}
                className="mt-8 text-2xl font-bold"
              >
                {children}
              </h2>
            );
          },
          h3({ children, ...props }) {
            return (
              <h3
                {...props}
                className="mt-6 text-xl font-bold"
              >
                {children}
              </h3>
            );
          },
          h4({ children, ...props }) {
            return (
              <h4
                {...props}
                className="mt-6 text-lg font-semibold"
              >
                {children}
              </h4>
            );
          },
          pre({ children }) {
            const lang = extractLanguageFromPre(children);

            if (lang === "mermaid") {
              return <>{children}</>;
            }

            return (
              <div className="my-6 overflow-hidden rounded-xl border border-soft">
                <div className="flex items-center gap-2 border-b border-soft bg-[var(--bg-soft)] px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                    {lang}
                  </span>
                </div>
                <pre className="code-window-pre overflow-x-auto bg-slate-950 px-4 py-4 text-sm text-slate-100">
                  {children}
                </pre>
              </div>
            );
          },
          th({ children, ...props }) {
            return (
              <th
                {...props}
                className="border border-soft px-4 py-2 text-left font-semibold"
              >
                {children}
              </th>
            );
          },
          td({ children, ...props }) {
            return (
              <td
                {...props}
                className="border border-soft px-4 py-2"
              >
                {children}
              </td>
            );
          },
          img({ ...props }) {
            const src = String(props?.src ?? "");
            const alt = String(props?.alt ?? "관련된 사진");

            return (
              <div className="my-10">
                <button
                  type="button"
                  onClick={() => openLightbox(src, alt)}
                  className="group relative h-80 w-full cursor-zoom-in overflow-hidden rounded-xl border border-soft"
                  aria-label="이미지 확대"
                  title="이미지 클릭으로 확대"
                >
                  <Image
                    fill
                    style={{ objectFit: "contain", objectPosition: "center" }}
                    src={src}
                    quality={85}
                    alt={alt}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                </button>
              </div>
            );
          },
          p({ children, ...props }) {
            return (
              <p
                {...props}
                className="my-4 break-words leading-8"
              >
                {children}
              </p>
            );
          },
          a({ children, ...props }) {
            const href = String(props.href ?? "#");
            const isExternal = href.startsWith("http");

            return (
              <Link
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="text-brand underline underline-offset-4"
              >
                {children}
              </Link>
            );
          },
          li({ children }) {
            return <li className="my-1">{children}</li>;
          },
          span({ children, node: _node, ...props }) {
            return <span {...props}>{children}</span>;
          },
          strong({ children }) {
            return <strong className="font-bold">{children}</strong>;
          },
          code({ className, children }) {
            const match = /language-(\w+)/.exec(className || "");
            const lang = match?.[1];
            const codeText = extractCodeText(children).replace(/\n$/, "");
            const isBlockWithoutLang = !lang && codeText.includes("\n");

            if (lang === "mermaid") {
              return <Mermaid chart={codeText} />;
            }

            if (lang || isBlockWithoutLang) {
              return (
                <code
                  className={`${className ?? ""} block whitespace-pre text-slate-100`}
                  style={{ color: "#e2e8f0" }}
                >
                  {children}
                </code>
              );
            }

            return (
              <code className="rounded bg-slate-200/70 px-1.5 py-0.5 text-[0.92em] text-slate-900 dark:bg-slate-700/60 dark:text-slate-100">
                {children}
              </code>
            );
          },
        }}
        rehypePlugins={[
          rehypeSlug,
          rehypeRaw,
          rehypeHighlight,
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
