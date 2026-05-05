import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "bf_admin_session";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip login page and auth API
  if (pathname === "/admin" || pathname.startsWith("/api/admin/auth")) {
    return NextResponse.next();
  }

  // Protect /admin/* and /api/admin/*
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
