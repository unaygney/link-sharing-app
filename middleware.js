import { NextResponse } from "next/server";
import { isAuthPages, verifyJwtToken } from "./utils/auth";

export async function middleware(req) {
  const { url, cookies, nextUrl } = req;
  const { value: token } = cookies.get("token") ?? { value: null };

  const hasVerifyToken = token && (await verifyJwtToken(token));
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);

  // dashboard page (root page) is only accessible to authenticated users
  if (nextUrl.pathname === "/" || nextUrl.pathname === "/profile") {
    if (hasVerifyToken) {
      const response = NextResponse.next();
      return response;
    }
    const response = NextResponse.redirect(new URL("/login", url));
    return response;
  }

  //* login and signnup pages are only accessible to unauthenticated users
  if (isAuthPageRequested) {
    if (hasVerifyToken) {
      const response = NextResponse.redirect(new URL("/", url));
      return response;
    }
    const response = NextResponse.next();
    return response;
  }
}

export const config = {
  matcher: ["/login", "/signup", "/", "/profile"],
};
