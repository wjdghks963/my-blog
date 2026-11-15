import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      /** 블로그 주인 여부. 서버(session 콜백)에서만 계산한다. */
      isOwner?: boolean;
    };
  }
}
