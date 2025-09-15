"use client";

import React, { useEffect } from "react";

type Props = {
  open: boolean;
  src: string;
  alt?: string;
  onClose: () => void;
};

export default function ImageLightbox({ open, src, alt, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    // Scroll lock
    const originalOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.documentElement.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 dark:bg-black/80"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-[96vw] max-w-5xl max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl ring-1 ring-black/10 dark:ring-white/10 overflow-hidden">
          {/* Scrollable viewport for tall images */}
          <div className="w-full max-h-[90vh] overflow-auto p-3">
            <img
              src={src}
              alt={alt ?? "image"}
              className="block max-w-full h-auto mx-auto"
            />
          </div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 w-9 h-9 shadow-lg ring-1 ring-black/10 dark:ring-white/10 hover:bg-white dark:hover:bg-gray-800"
            aria-label="close"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
