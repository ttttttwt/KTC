import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const url = request.nextUrl.clone();

  // If no access token and not on login page, redirect to login
  if (!accessToken && url.pathname !== "/") {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // If has access token and on login page, redirect to my-tasks
  if (accessToken && url.pathname === "/") {
    url.pathname = "/my-tasks";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match tất cả route ("/") nhưng loại trừ:
     * - static files (_next, assets...)
     * - API routes
     * - /login
     */
    "/((?!_next/static|_next/image|favicon.ico|login|api).*)",
  ],
};
