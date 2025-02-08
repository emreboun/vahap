"use server";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { jwtConfig } from "@/config";
import { NextResponse } from "next/server";

export const loginApi = async (userId: string) => {
  const token = await generateToken({ userId }, jwtConfig.secret, "1y");
  const cookieStore = await cookies();
  cookieStore.set("token", token);
  return true;
};

export const logoutApi = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  return true;
};

interface TokenPayload {
  userId: string;
  email?: string;
}

export const generateToken = async (
  payload: TokenPayload,
  secret: string,
  expiresIn: string
): Promise<string> => {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const jwt = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .sign(key);

  return jwt;
};
