// Configuration for JWT
export const jwtConfig = {
  secret: process.env.JWT_SECRET ?? "secret", // new TextEncoder().encode(process.env.JWT_SECRET ?? "secret"),
};
