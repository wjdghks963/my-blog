import React from "react";

export default function NoteLists({ children }: { children: React.ReactNode }) {
  return <ul className="m-0 p-0 list-none">{children}</ul>;
}
