import { NextResponse, type NextRequest } from "next/server";
import * as jose from "jose";
import { jwtConfig } from "./config";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = getToken(req);
  const valid = token ? await isValidToken(token) : false;
  // Check if the request is for the admin path

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/giris")) {
    // If there is no token or token is invalid, redirect to login

    if (!token || !valid || valid.role === "user" || valid.role !== "gm") {
      const loginUrl = new URL("/admin/giris", req.url);
      return NextResponse.redirect(loginUrl);
    }
  } else if (pathname.startsWith("/admin/giris")) {
    if (valid) {
      if (valid.role !== "user") {
        const adminUrl = new URL("/admin", req.url);
        return NextResponse.redirect(adminUrl);
      } else {
        const homeUrl = new URL("/", req.url);
        return NextResponse.redirect(homeUrl);
      }
    }
  }

  if (pathname.startsWith("/odeme") || pathname.startsWith("/hesabim")) {
    if (!valid) {
      const homeUrl = new URL("/", req.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  if (pathname === "/giris" || pathname === "/kayit") {
    if (valid) {
      const homeUrl = new URL("/", req.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  // Continue with the request if not an admin path or if valid token exists
  return NextResponse.next();
}

// Get the JWT token from cookies
const getToken = (req: NextRequest): string | undefined => {
  const token = req.cookies.get("token");
  return token?.value || undefined;
};

// Validate the JWT token
const isValidToken = async (token: string): Promise<any> => {
  try {
    if (token.startsWith("Bearer ")) {
      token = token.slice("Bearer ".length);
    }

    const result = await jose.jwtVerify(
      token,
      new TextEncoder().encode(jwtConfig.secret)
    );

    return result.payload;
  } catch (err) {
    console.error("JWT verification error:", err);
    return false;
  }
};
