import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const accessCode = process.env.ACCESS_CODE;

    // If no code is set, the app is open
    if (!accessCode) {
        return NextResponse.next();
    }

    const basicAuth = req.headers.get("authorization");

    if (basicAuth) {
        const authValue = basicAuth.split(" ")[1];
        const [user, pwd] = atob(authValue).split(":");

        // We only care about the password matching the access code
        if (pwd === accessCode || user === accessCode) {
            return NextResponse.next();
        }
    }

    // Request basic auth
    return new NextResponse("Unauthorized", {
        status: 401,
        headers: {
            "WWW-Authenticate": 'Basic realm="Access Gate"',
        },
    });
}

export const config = {
    // Apply this to everything except static assets and Next internals
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
