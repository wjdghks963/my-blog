"use client";

import UserImageBox from "@domains/comment/components/UserImageBox";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

// 로그인 실패 사유 (next-auth 가 ?error=코드 로 돌려보낸다)
const LOGIN_ERRORS: Record<string, string> = {
  NotOwner:
    "이 GitHub 계정에는 블로그 주인 이메일(MY_EMAIL)과 일치하는 인증된 이메일이 없습니다. GitHub 계정의 이메일 설정 또는 서버의 MY_EMAIL 값을 확인해 주세요.",
  OwnerNotConfigured: "서버에 MY_EMAIL 환경 변수가 설정되어 있지 않습니다.",
  EmailLookupFailed: "GitHub에서 계정 이메일을 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  UserSaveFailed: "로그인 정보는 확인됐지만 사용자 정보를 DB에 저장하지 못했습니다. 서버 로그를 확인해 주세요.",
  AccessDenied: "로그인이 허용되지 않은 계정입니다.",
  Configuration: "서버 인증 설정에 문제가 있습니다. (GITHUB_ID / GITHUB_SECRET / SECRET / NEXTAUTH_URL 확인)",
  OAuthSignin: "GitHub 로그인 요청을 시작하지 못했습니다. (GITHUB_ID / GITHUB_SECRET 확인)",
  OAuthCallback:
    "GitHub에서 돌아오는 과정에서 오류가 났습니다. GitHub OAuth 앱의 콜백 주소와 NEXTAUTH_URL이 이 사이트 주소와 같은지 확인해 주세요.",
  Callback: "로그인 처리 중 서버 오류가 났습니다. 서버 로그를 확인해 주세요.",
};

function useLoginError() {
  const [code, setCode] = useState<string | null>(null);
  useEffect(() => {
    setCode(new URLSearchParams(window.location.search).get("error"));
  }, []);
  if (!code) return null;
  return { code, message: LOGIN_ERRORS[code] ?? "로그인 중 알 수 없는 오류가 났습니다." };
}

export default function Profile() {
  const { data: session } = useSession();
  const loginError = useLoginError();

  return (
    <main
      className="flex min-h-[70vh] items-center justify-center px-6"
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

        {!session && loginError && (
          <div
            role="alert"
            style={{
              marginBottom: 20,
              padding: "12px 14px",
              borderLeft: "3px solid var(--accent-5)",
              background: "var(--paper)",
              borderRadius: "0 6px 6px 0",
              fontSize: 13.5,
              lineHeight: 1.6,
              color: "var(--ink-2)",
            }}
          >
            <div style={{ fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>로그인에 실패했습니다</div>
            {loginError.message}
            <div className="font-mono" style={{ marginTop: 6, fontSize: 11, color: "var(--ink-3)" }}>
              code: {loginError.code}
            </div>
          </div>
        )}

        {session ? (
          <div className="flex flex-col items-center gap-5">
            <UserImageBox src={`${session.user?.image}`} />
            <span
              className="font-display"
              style={{
                fontSize: 22,
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
              className="font-display"
              style={{
                fontSize: 22,
                color: "var(--ink)",
              }}
            >
              로그인 해주세요
            </p>
            <button
              onClick={() => signIn("github", { callbackUrl: "/profile" })}
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
