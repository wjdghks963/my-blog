"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

import UserImageBox from "@components/Comment/UserImageBox";

export default function Profile() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col justify-center items-center gap-5 h-[90vh]">
      {session ? (
        <div className={"flex flex-col gap-4"}>
          <UserImageBox src={`${session.user?.image}`} />
          <span className={"font-bold text-center"}>{session.user?.name}</span>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <>
          로그인 해주세요
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </div>
  );
}
