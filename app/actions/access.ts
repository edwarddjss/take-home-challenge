"use server";

import { cookies } from "next/headers";
import { accessCookieName } from "@/constants/access";
import { createAccessToken, isAccessCodeMatch } from "@/lib/access/access-auth";

export async function verifyAccessCode(code: string) {
  const accessCode = process.env.ACCESS_CODE;

  if (!accessCode) {
    return { success: true };
  }

  if (!isAccessCodeMatch(code, accessCode)) {
    return { success: false };
  }

  const cookieStore = await cookies();
  cookieStore.set(accessCookieName, await createAccessToken(accessCode), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return { success: true };
}
