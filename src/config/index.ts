// Configuration for JWT
export const jwtConfig = {
  secret: process.env.JWT_SECRET ?? "secret", // new TextEncoder().encode(process.env.JWT_SECRET ?? "secret"),
};

export const appConfig = {
  url: process.env.SITE_URL ?? "http://127.0.0.1:3000",
};

export const iyzicoConfig = {
  apiKey: process.env.IYZIPAY_API_KEY || "",
  secretKey: process.env.IYZIPAY_SECRET_KEY || "",
  url: process.env.IYZIPAY_URI || "https://sandbox-api.iyzipay.com",
};
