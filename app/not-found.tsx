"use client";

import { motion, Variants } from "framer-motion";
import Lottie from "lottie-react";
import Link from "next/link";

import notFoundLottie from "@public/notFoundLottie.json";

export default function NotFound() {
  return (
    <div className={"h-screen w-screen flex flex-col justify-center"}>
      <Lottie
        className={"h-1/3 w-full"}
        animationData={notFoundLottie}
        loop={true}
      />
      <p className={"text-center font-bold text-xl"}>찾으시는 포스트가 존재하지 않습니다.</p>
      <div className={"flex flex-col gap-10 mt-5"}>
        <motion.div
          className={"text-center font-semibold text-md"}
          whileHover="hover"
          variants={spanVariants}
        >
          <Link href="/">메인 페이지로 돌아가시려면 여기</Link>
        </motion.div>

        <motion.div
          className={"text-center font-semibold text-md"}
          whileHover="hover"
          variants={spanVariants}
        >
          <Link href="/blogs">검색 페이지로 돌아가시려면 여기</Link>
        </motion.div>
      </div>
    </div>
  );
}

const spanVariants: Variants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
    },
  },
};
