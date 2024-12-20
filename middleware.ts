import { auth } from "@/auth";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export default auth((req) => {
  if (!req.auth || req.auth.error === "RefreshTokenError") {
    const newUrl = new URL("/login", req.nextUrl.origin);

    return Response.redirect(newUrl);
  }
});

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/admin")) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    const data = token?.user;
    if (!data) {
      const newUrl = new URL("/login", req.nextUrl.origin);

      return Response.redirect(newUrl);
    }
    if (!data.isAdmin) {
      const newUrl = new URL("/login-admin", req.nextUrl.origin);

      return Response.redirect(newUrl);
    }
  }
}

export const config = {
  matcher: ["/", "/admin/:path*"],
};
