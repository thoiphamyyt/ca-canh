import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("access_token")?.value;
  const { pathname } = req.nextUrl;
  const host = req.headers.get("host");
  const protocol = req.headers.get("x-forwarded-proto") || "http";

  const origin = `${protocol}://${host}`;

  // Các route public (không cần login)
  const publicRoutes = [
    "/login",
    "/register",
    "/home",
    "/product",
    "/detail-product",
    "/news",
    "/cart",
  ];

  if (
    pathname === "/" ||
    publicRoutes.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.next();
  }

  const customerProtectedRoutes = [
    "/checkout",
    "/profile",
    "/checkout-cart",
    "/orders",
  ];
  const isCustomerProtected = customerProtectedRoutes.some((path) =>
    pathname.startsWith(path)
  );
  const isAdminProtected = pathname.startsWith("/admin");

  if (isCustomerProtected || isAdminProtected) {
    if (!token) {
      const loginUrl = new URL("/login", origin);
      loginUrl.searchParams.set("error", "unauthorized");
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete("access_token");
      return res;
    }

    try {
      // Verify JWT bằng jose
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      // Check admin
      if (isAdminProtected && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/", origin));
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Invalid token", error);
      const loginUrl = new URL("/login", origin);
      loginUrl.searchParams.set("error", "invalid_token");
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
