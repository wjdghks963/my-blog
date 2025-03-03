"use client";

import Link from "next/link";

export default function Certificate({
  course,
  date,
  certificateUrl,
  skills,
}: {
  course: string;
  date: string;
  certificateUrl: string;
  skills?: string[]; // 추가된 기술 스택 배열
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full p-6 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
      <p className="mt-2 text-gray-700 dark:text-gray-300 text-lg font-semibold">📚 {course} 과정</p>
      <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">📅 발급일: {date}</p>

      {skills && (
        <div className="flex flex-wrap gap-2 mt-3">
          {skills?.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full text-sm font-medium bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-white shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      <Link
        href={certificateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 px-6 py-3 text-white bg-blue-600 dark:bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-400 transition-all"
      >
        🔗 수료증 확인하기
      </Link>
    </div>
  );
}
