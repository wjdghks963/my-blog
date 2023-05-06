import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import KakaoProvider from "next-auth/providers/kakao";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_ID as string,
      clientSecret: process.env.KAKAO_SECRET as string
    }),
    TwitterProvider({
        clientId: process.env.TWITTER_ID as string,
        clientSecret: process.env.TWITTER_SECRET as string,
        version: "2.0",
    })
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
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url;
    },
  },
});
