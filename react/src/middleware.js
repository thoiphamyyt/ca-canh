import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("access_token")?.value;

  // Các route yêu cầu login
  const publicRoutes = [
    "/login",
    "/regiser",
    "/home",
    "/",
    "/product",
    "/detail-product",
    "/news",
  ];

  if (publicRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  } else {
    if (!token) {
      // Nếu chưa đăng nhập thì redirect về /login
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("error", "unauthorized");
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete("access_token");
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

// Áp dụng cho tất cả các route (trừ /_next, static...)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
