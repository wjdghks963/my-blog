import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

import prismaclient from "@libs/server/prismaClient";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_ID as string,
      clientSecret: process.env.KAKAO_SECRET as string,
    }),
    // TwitterProvider({
    //     clientId: process.env.TWITTER_ID as string,
    //     clientSecret: process.env.TWITTER_SECRET as string,
    //     version:"2.0"
    // })
  ],
  session: { strategy: "jwt", maxAge: 14 * 24 * 60 * 60 },
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return url;
    },
    async signIn({ user, account }) {
      if (user) {
        return await userTransaction({
          email: user.email!,
          name: user.name!,
          image: user.image!,
          domain: account?.provider,
        });
      }
      return true;
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
  let nameProperty = name === "" || undefined ? "" : name + "";
  let imageProperty = image === "" || undefined ? "" : image + "";
  let domainProperty = image === "" || undefined ? "" : domain + "";

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
      const updateData = {
        name: user.name === name ? undefined : name,
        image: user.image === image ? undefined : image,
        domain: user.domain === domain ? undefined : domain,
      };

      if (Object.values(updateData).some((x) => x !== undefined)) {
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
  } catch (error: any) {
    console.error(error);
    return false;
  }
};
