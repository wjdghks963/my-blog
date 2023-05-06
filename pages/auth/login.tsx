import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

export default function Login() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col justify-center items-center gap-5 h-[100vh]">
      {session ? (
        <>
          Signed in as {session.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          로그인 해주세요 <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </div>
  );
}
