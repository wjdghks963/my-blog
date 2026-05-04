"use client";

import UserImageBox from "@domains/comment/components/UserImageBox";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <main
      className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <div
        className="w-full max-w-md"
        style={{
          border: "1px solid var(--rule)",
          background: "var(--paper-2)",
          borderRadius: 6,
          padding: 32,
        }}
      >
        <div className="tiny-label" style={{ color: "var(--accent)", marginBottom: 12 }}>
          PROFILE
        </div>

        {session ? (
          <div className="flex flex-col items-center gap-5">
            <UserImageBox src={`${session.user?.image}`} />
            <span
              className="font-serif"
              style={{
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: "-0.01em",
                color: "var(--ink)",
              }}
            >
              {session.user?.name}
            </span>
            <button
              onClick={() => signOut()}
              className="tiny-label"
              style={{
                color: "var(--ink-2)",
                borderBottom: "1px solid var(--ink-2)",
                paddingBottom: 1,
              }}
            >
              Sign out →
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p
              className="font-serif"
              style={{
                fontSize: 22,
                fontStyle: "italic",
                fontWeight: 500,
                color: "var(--ink)",
              }}
            >
              로그인 해주세요
            </p>
            <button
              onClick={() => signIn()}
              style={{
                background: "var(--ink)",
                color: "var(--paper)",
                border: "none",
                padding: "8px 18px",
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}
            >
              Sign in
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
