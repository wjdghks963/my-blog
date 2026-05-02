"use client";

import { cls } from "@shared/utils/utils";
import { ThumbnailPostData } from "@types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PostWithThumbnail({
  data,
  className,
}: {
  data: ThumbnailPostData;
  className?: string;
}) {
  const router = useRouter();

  const moveToPost = (id: number) => {
    router.push(`/blogs/post/${id}`);
  };

  if (className?.includes("feature-card")) {
    return (
      <article
        className={cls(
          className ?? "",
          "group flex h-full cursor-pointer flex-col p-6 transition-colors hover:bg-paper-soft"
        )}
        onClick={() => moveToPost(data.id)}
      >
        {data.thumbnail ? (
          <div className="relative mb-5 h-44 w-full overflow-hidden border-[1.5px] border-ink">
            <Image
              src={data.thumbnail}
              alt="Thumbnail"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              quality={75}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="mb-5 flex h-44 w-full items-center justify-center border-[1.5px] border-ink bg-paper-soft">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.32em] text-muted">No image</span>
          </div>
        )}

        <h3 className="mb-2 line-clamp-2 font-display text-xl font-bold leading-tight tracking-[-0.01em]">
          {data.title}
        </h3>

        {data.description && <p className="mb-5 line-clamp-3 text-sm text-muted">{data.description}</p>}

        <div className="mt-auto flex items-center justify-between border-t border-soft pt-3 font-display text-[10px] font-bold uppercase tracking-[0.28em] text-muted">
          <span>{(data.views ?? 0).toLocaleString()} reads</span>
          <span className="transition-transform group-hover:translate-x-1">Read →</span>
        </div>
      </article>
    );
  }

  if (className?.includes("sidebar-card")) {
    return (
      <article
        className="group flex cursor-pointer items-start gap-3 border-b border-soft py-3 transition-colors hover:bg-paper-soft"
        onClick={() => moveToPost(data.id)}
      >
        {data.thumbnail && (
          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden border border-ink">
            <Image
              src={data.thumbnail}
              alt="Thumbnail"
              className="object-cover"
              quality={60}
              fill
              sizes="56px"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h4 className="line-clamp-2 font-display text-sm font-bold leading-snug">{data.title}</h4>
          <span className="mt-1 block font-display text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
            {(data.views ?? 0).toLocaleString()} reads
          </span>
        </div>
      </article>
    );
  }

  // legacy fallback
  return (
    <article
      className={cls(
        className ?? "",
        "group w-full cursor-pointer overflow-hidden border-[1.5px] border-ink mobile:w-1/5"
      )}
      onClick={() => moveToPost(data.id)}
    >
      {data.thumbnail && (
        <div className="relative hidden h-32 w-full overflow-hidden mobile:block">
          <Image
            src={data.thumbnail}
            alt="Thumbnail"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            quality={75}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col justify-between p-4">
        <h3 className="mb-2 line-clamp-3 font-display text-base font-bold mobile:text-lg">{data.title}</h3>
        <div className="flex items-center justify-between font-display text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
          <span>{(data.views ?? 0).toLocaleString()} reads</span>
        </div>
      </div>
    </article>
  );
}
