import PostEditPage from "@domains/post/pages/post-edit.page";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PostEditPage />
    </Suspense>
  );
}
