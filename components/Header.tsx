import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";

export default function Layout() {
  const { theme, setTheme } = useTheme();
  const [load, setLoad] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoad(false);
  }, [load]);

  return (
    <div className="flex flex-row mt-5 px-16">
      <ul className="flex flex-row justify-between w-full">
        <li
          className="cursor-pointer hover:shadow-xl w-1/5 text-center"
          onClick={() => router.push("/")}
        >
          HOME
        </li>
        <li
          className="cursor-pointer hover:shadow-xl w-1/5 text-center"
          onClick={() => router.push("/blogs")}
        >
          BLOG
        </li>
        <li
          className="cursor-pointer hover:shadow-xl w-1/5 text-center"
          onClick={() => router.push("/resume")}
        >
          RESUME
        </li>
        <li className="">
          {load ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              ></path>
            </svg>
          ) : (
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-gray-500 dark:text-gray-400"
            >
              {theme === "light" ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 "
                  fill="none"
                  stroke="yellow"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              )}
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}
