import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth || req.auth.error === "RefreshTokenError") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/"],
};
