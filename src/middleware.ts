import { NextResponse, type NextRequest } from "next/server";
import * as jose from "jose";
import { jwtConfig } from "./config";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = getToken(req);
  const valid = token ? await isValidToken(token) : false;
  // Check if the request is for the admin path
  if (pathname.startsWith("/admin") && !pathname.endsWith("/admin/giris")) {
    // If there is no token or token is invalid, redirect to login
    if (!token || !isValidToken(token)) {
      const loginUrl = new URL("/admin/giris", req.url);
      return NextResponse.redirect(loginUrl);
    }
  } else if (pathname.endsWith("/admin/giris")) {
    if (valid) {
      const adminUrl = new URL("/admin", req.url);
      return NextResponse.redirect(adminUrl);
    }
  }
  if (pathname.endsWith("giris") || pathname.endsWith("kayit")) {
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
const isValidToken = async (token: string): Promise<boolean> => {
  try {
    if (token.startsWith("Bearer ")) {
      token = token.slice("Bearer ".length);
    }

    const result = await jose.jwtVerify(
      token,
      new TextEncoder().encode(jwtConfig.secret)
    );

    return !!result.payload.userId;
  } catch (err) {
    console.error("JWT verification error:", err);
    return false;
  }
};
