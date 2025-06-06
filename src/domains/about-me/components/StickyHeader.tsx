"use client";

import Link from "next/link";

export default function StickyHeader() {
  return (
    <aside className="hidden md:flex flex-col w-1/5 h-screen sticky top-0 p-6 bg-gray-100 dark:bg-gray-900 border-l border-gray-300 dark:border-gray-700 flex-shrink-0 ml-auto">
      <h2 className="text-xl font-semibold mb-4">📌 내 정보</h2>
      <nav className="flex flex-col gap-4">
        <Link
          href="#career"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
        >
          경력
        </Link>
        <Link
          href="#certifications"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
        >
          자격증
        </Link>
        <Link
          href="#skills"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
        >
          기술스택
        </Link>
        <Link
          href="#projects"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
        >
          프로젝트
        </Link>
        <Link
          href="#courses"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
        >
          수료증
        </Link>
      </nav>
    </aside>
  );
}
