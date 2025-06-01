import React from "react";

export default function NoteLists({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-4 text-gray-600 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-800 transition-all duration-300">
      {children}
    </ul>
  );
}
