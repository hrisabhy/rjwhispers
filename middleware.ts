import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  
  if (session) {
    // If logged in, allow only "/feed" and redirect other pages to "/feed"
    if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
      return NextResponse.redirect(new URL("/feed", req.url));
    }
  } else {
    // If not logged in, allow only "/", "/login", "/signup" and redirect others to "/login"
    if (!["/", "/login", "/signup"].includes(pathname)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/", "/feed", "/login", "/signup"],
};