import { useRouter } from "next/router";
import React from "react";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="py-5">
      <ul className="flex flex-row justify-between px-10">
        <li
          className="cursor-pointer"
          onClick={() => router.push("https://github.com/wjdghks963")}
        >
          Github
        </li>
        <li
          className="cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          TOP
        </li>
      </ul>
    </footer>
  );
}
