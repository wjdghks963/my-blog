"use client";

import { useEffect, useRef } from "react";

type Props = {
  postId: number;
};

export default function ViewTracker({ postId }: Props) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;
    hasTracked.current = true;

    fetch(`/api/blogs/${postId}/views`, {
      method: "POST",
      keepalive: true,
    }).catch(() => {});
  }, [postId]);

  return null;
}
