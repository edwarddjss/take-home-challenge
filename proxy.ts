import { type NextRequest, NextResponse } from "next/server";
import { accessCookieName } from "@/constants/access";
import { isAuthorizedAccessToken } from "@/lib/access/access-auth";

export async function proxy(req: NextRequest) {
  const accessCode = process.env.ACCESS_CODE;

  if (!accessCode) {
    return NextResponse.next();
  }

  const pathname = req.nextUrl.pathname;
  const search = req.nextUrl.search;
  const token = req.cookies.get(accessCookieName)?.value;
  const isAuthorized = await isAuthorizedAccessToken(token, accessCode);

  if (pathname === "/access") {
    return isAuthorized ? NextResponse.redirect(new URL("/", req.url)) : NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    if (!isAuthorized) {
      return NextResponse.json({ code: "unauthorized", message: "Access code required." }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (!isAuthorized) {
    const accessUrl = new URL("/access", req.url);
    accessUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(accessUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
