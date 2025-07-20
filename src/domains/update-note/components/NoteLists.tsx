import React from "react";

export default function NoteLists({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-2 text-gray-700 dark:text-gray-200">{children}</ul>;
}
