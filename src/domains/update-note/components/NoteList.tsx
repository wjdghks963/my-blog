import React from "react";

export default function NoteList({ content }: { content: string }) {
  return <li className="border-b py-2">{content}</li>;
}
