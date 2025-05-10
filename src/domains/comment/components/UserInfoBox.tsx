"use client";

import { UserInfo } from "@/shared/types";
import { useRouter } from "next/navigation";
import React from "react";

import UserImageBox from "@components/Comment/UserImageBox";

export default function UserInfoBox({ userInfo }: { userInfo?: UserInfo }) {
  const router = useRouter();

  const redirectToProfile = () => {
    return router.push("/profile");
  };

  return (
    <div
      className={"flex flex-col w-12"}
      onClick={redirectToProfile}
    >
      <UserImageBox src={userInfo?.image ?? ""} />
      <span className={"hidden text-center font-semibold mobile:block"}>{userInfo?.name}</span>
    </div>
  );
}
