import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import prismaclient from "@libs/server/prismaClient";

function ownerEmail() {
  return (process.env.MY_EMAIL ?? "").trim().toLowerCase();
}

function isOwnerEmail(email?: string | null) {
  const owner = ownerEmail();
  return !!email && !!owner && email.trim().toLowerCase() === owner;
}

/** 로그인 실패 시 이유를 프로필 페이지에 표시하기 위한 이동 주소 */
function deny(reason: string) {
  return `/profile?error=${reason}`;
}

/**
 * GitHub 계정에 등록된 "인증된" 이메일 전체를 가져온다.
 * 프로필에 공개한 이메일이나 기본 이메일이 MY_EMAIL 과 달라도,
 * 계정에 인증된 이메일로 등록돼 있으면 주인으로 인정하기 위함.
 */
async function fetchVerifiedGithubEmails(accessToken?: string): Promise<string[] | null> {
  if (!accessToken) return null;
  try {
    const res = await fetch("https://api.github.com/user/emails", {
      headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/vnd.github+json" },
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[auth] GitHub 이메일 조회 실패:", res.status);
      return null;
    }
    const emails: { email: string; verified: boolean }[] = await res.json();
    return emails.filter((e) => e.verified).map((e) => e.email.toLowerCase());
  } catch (error) {
    console.error("[auth] GitHub 이메일 조회 오류:", error);
    return null;
  }
}

export const authOptions: NextAuthOptions = {
  // 로그인은 GitHub 한 곳, 그리고 블로그 주인(MY_EMAIL) 계정만 허용한다.
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      // GitHub이 RFC 9207 롤아웃으로 콜백에 iss 파라미터를 보내기 시작해
      // issuer 미설정 시 openid-client 검증이 실패한다 (OAUTH_CALLBACK_ERROR).
      issuer: "https://github.com/login/oauth",
    }),
  ],
  session: { strategy: "jwt", maxAge: 14 * 24 * 60 * 60 },
  secret: process.env.SECRET,
  // 로그인 실패 시 기본 에러 화면 대신 프로필 페이지에서 이유를 보여준다.
  pages: { signIn: "/profile", error: "/profile" },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // 같은 출처로만 리다이렉트 (callbackUrl 을 이용한 오픈 리다이렉트 방지)
      if (url.startsWith("/") && !url.startsWith("//")) return `${baseUrl}${url}`;
      try {
        if (new URL(url).origin === baseUrl) return url;
      } catch {
        // 잘못된 URL 은 무시
      }
      return baseUrl;
    },
    async signIn({ user, account }) {
      const owner = ownerEmail();

      if (!owner) {
        console.error("[auth] MY_EMAIL 환경 변수가 설정되지 않았습니다.");
        return deny("OwnerNotConfigured");
      }
      if (account?.provider !== "github") {
        return deny("NotOwner");
      }

      // 1) 프로필 이메일이 바로 일치하거나, 2) 계정의 인증된 이메일 중 하나가 일치하면 주인
      let matched = isOwnerEmail(user?.email);
      if (!matched) {
        const verified = await fetchVerifiedGithubEmails(account.access_token);
        if (verified === null) return deny("EmailLookupFailed");
        matched = verified.includes(owner);
      }

      if (!matched) {
        console.warn("[auth] 주인 이메일과 일치하지 않는 GitHub 계정의 로그인 시도를 거부했습니다.");
        return deny("NotOwner");
      }

      // 세션 이메일을 주인 이메일로 고정 (서버의 주인 확인과 항상 일치하도록)
      user.email = process.env.MY_EMAIL!.trim();

      const saved = await userTransaction({
        email: user.email,
        name: user.name ?? "",
        image: user.image ?? "",
        domain: account.provider,
      });

      return saved ? true : deny("UserSaveFailed");
    },
    async session({ session }) {
      // 주인 여부는 서버에서만 판단해 내려준다 (이메일을 클라이언트 번들에 넣지 않기 위함)
      if (session.user) {
        session.user.isOwner = isOwnerEmail(session.user.email);
      }
      return session;
    },
  },
};

interface SessionData {
  name?: string;
  email: string;
  image?: string;
  domain?: string;
}

const userTransaction = async ({ email, name, image, domain }: SessionData) => {
  const nameProperty = name || "";
  const imageProperty = image || "";
  const domainProperty = domain || "";

  try {
    const user = await prismaclient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      // 사용자 등록
      await prismaclient.user.create({
        data: {
          email,
          name: nameProperty,
          image: imageProperty,
          domain: domainProperty,
        },
      });
    } else {
      // email에 해당하는 사용자가 이미 등록되어 있는 경우
      const updateData: { name?: string; image?: string; domain?: string } = {};

      if (user.name !== nameProperty) updateData.name = nameProperty;
      if (user.image !== imageProperty) updateData.image = imageProperty;
      if (user.domain !== domainProperty) updateData.domain = domainProperty;

      if (Object.keys(updateData).length > 0) {
        // 변경할 값이 존재하는 경우, 사용자 정보 업데이트
        await prismaclient.user.update({
          where: {
            email,
          },
          data: updateData,
        });
      }
    }
    return true;
  } catch (error: unknown) {
    console.error("[AuthOptions] userTransaction error:", error);
    return false;
  }
};
