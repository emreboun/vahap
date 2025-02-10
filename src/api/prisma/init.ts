import { PrismaClient } from "@prisma/client";

// Declare a global variable to store the PrismaClient instance
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create a new PrismaClient instance or reuse an existing one
const prisma =
  global.prisma ||
  new PrismaClient({
    // Optional: Configure Prisma Client options here
    // For example, enable logging:
    // log: ['query', 'error', 'warn'],
  });

export default prisma;
// Assign the PrismaClient instance to the global variable
// in development mode to prevent hot reloading issues
if (process.env.NODE_ENV !== "production") global.prisma = prisma;
