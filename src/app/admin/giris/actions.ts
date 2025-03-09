"use server";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { jwtConfig } from "@/config";

export const loginApi = async (user: any) => {
  const { id, password, role = "user" } = user;
  const token = await generateToken(
    { id, password, role },
    jwtConfig.secret,
    "1y"
  );

  const cookieStore = await cookies();
  cookieStore.set("token", token);
  cookieStore.set("userid", id);
  return true;
};

export const logoutApi = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("userid");

  return true;
};

interface TokenPayload {
  id: string;
  password: string;
  role: "gm" | "user";
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
