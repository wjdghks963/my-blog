import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session?.user?.email === process.env.MY_EMAIL) {
    return router.push("/");
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5 h-[100vh]">
      {session ? (
        <>
          Signed in as {session.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </div>
  );
}
