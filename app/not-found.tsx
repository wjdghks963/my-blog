import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
        <p className="text-center font-bold text-xl mb-8 text-gray-700 dark:text-gray-300">
          찾으시는 포스트가 존재하지 않습니다.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 sm:justify-center">
          <Link
            href="/"
            className="text-center font-semibold text-md text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 underline underline-offset-4"
          >
            메인 페이지로 돌아가기
          </Link>
          <Link
            href="/blogs"
            className="text-center font-semibold text-md text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 underline underline-offset-4"
          >
            검색 페이지로 가기
          </Link>
        </div>
      </div>
    </div>
  );
}
