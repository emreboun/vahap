// Configuration for JWT
export const jwtConfig = {
  secret: process.env.JWT_SECRET ?? "secret", // new TextEncoder().encode(process.env.JWT_SECRET ?? "secret"),
};

export const appConfig = {
  url: process.env.SITE_URL ?? "http://127.0.0.1:3000",
};
