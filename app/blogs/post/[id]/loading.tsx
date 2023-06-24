"use client";

import Lottie from "lottie-react";

import LoadingJson from "@public/loadingLottie.json";

export default function Loading() {
  return (
    <div className={"h-screen"}>
      <Lottie
        className={"h-full"}
        animationData={LoadingJson}
        loop={true}
      />
    </div>
  );
}
