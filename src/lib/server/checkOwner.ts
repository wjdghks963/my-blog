import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@libs/server/authOptions";

export async function checkOwner() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const blogOwnerEmail = process.env.MY_EMAIL;

  if (session.user.email !== blogOwnerEmail) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  return null;
}
