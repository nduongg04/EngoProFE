import { auth } from "@/auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  // Admin routes middleware
  if (pathname.startsWith("/admin")) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    const data = token?.user;
    if (!data) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (!data.isAdmin) {
      return NextResponse.redirect(new URL("/login-admin", req.url));
    }
    return NextResponse.next();
  }

  // Auth middleware for non-admin routes
  const session = await auth();
  if (!session || session.error === "RefreshTokenError") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply auth middleware to all routes except public ones
    "/((?!api|_next/static|_next/image|favicon.ico|login|register|landing-page|login-admin).*)",
    // Apply admin middleware to admin routes
    "/admin/:path*"
  ]
};
