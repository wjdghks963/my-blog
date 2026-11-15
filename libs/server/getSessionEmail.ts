import { getServerSession } from "next-auth";

import { authOptions } from "@libs/server/authOptions";

/** 로그인한 사용자의 이메일. 비로그인 시 null. 반드시 서버 세션에서만 얻는다. */
export async function getSessionEmail(): Promise<string | null> {
  const session = await getServerSession(authOptions);
  return session?.user?.email ?? null;
}

export function isOwnerEmail(email: string | null): boolean {
  const ownerEmail = process.env.MY_EMAIL;
  return !!email && !!ownerEmail && email.trim().toLowerCase() === ownerEmail.trim().toLowerCase();
}
