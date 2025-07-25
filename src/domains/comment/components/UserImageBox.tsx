"use client";

import { getDomainFromImageUrl } from "@shared/utils/getDomainImg";
import { cls } from "@shared/utils/utils";
import Image from "next/image";
import React from "react";

export default function UserImageBox({ src, className }: { src: string; className?: string }) {
  const imgURL = getDomainFromImageUrl(src) as string;

  return src !== "undefined" || false || null ? (
    <div className={cls(className ? className : "", "relative")}>
      <Image
        className={"rounded-2xl"}
        src={src}
        quality={70}
        width={100}
        height={100}
        alt={"profile"}
      />
      <div className={"absolute rounded-full bg-white block -top-2 -left-2 flex justify-center "}>
        <Image
          className={"w-6 h-6"}
          src={imgURL}
          quality={70}
          width={25}
          height={25}
          alt={"domain-icon"}
        />
      </div>
    </div>
  ) : null;
}
