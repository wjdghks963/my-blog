"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={"w-[100vw] min-h-screen flex flex-col justify-center gap-20"}>
      <h2 className="font-bold text-3xl text-center">Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
