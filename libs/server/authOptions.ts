import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import prismaclient from "@libs/server/prismaClient";

function isOwnerEmail(email?: string | null) {
  const ownerEmail = process.env.MY_EMAIL;
  return !!email && !!ownerEmail && email.toLowerCase() === ownerEmail.toLowerCase();
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
      // 주인 이메일의 GitHub 계정이 아니면 전부 거부
      if (account?.provider !== "github" || !isOwnerEmail(user?.email)) {
        return false;
      }

      return await userTransaction({
        email: user.email!,
        name: user.name ?? "",
        image: user.image ?? "",
        domain: account.provider,
      });
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
