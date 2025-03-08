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
  } else if (pathname.startsWith("/admin/login")) {
    if (valid && valid.role !== "user") {
      const adminUrl = new URL("/admin", req.url);
      return NextResponse.redirect(adminUrl);
    }
  }

  if (pathname.startsWith("/odeme")) {
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
  /* const ip = req.headers.get("x-forwarded-for") || "Unknown IP";
  console.log("User IP:", ip); */

  /* const allowedHosts = [
    "sandbox-cpp.iyzipay.com",
    "drama-catherine-loaded-proceedings.trycloudflare.com",
    "",
  ];

  const origin = req.headers.get("origin") || "";
  const forwardedHost = req.headers.get("x-forwarded-host") || "";

  if (allowedHosts.includes(forwardedHost) || allowedHosts.includes(origin)) {
    return NextResponse.next();
  } else {
    return new NextResponse("Forbidden: Host mismatch", { status: 403 });
  } */
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

    //console.log(result);

    return result.payload;
  } catch (err) {
    console.error("JWT verification error:", err);
    return false;
  }
};
