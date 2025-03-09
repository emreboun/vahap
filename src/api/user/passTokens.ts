import { PasswordResetToken } from "@prisma/client";
import { CrudRepository, CrudService } from "../prisma/crud";
import prisma from "../prisma/init";

export const passTokenRepository = new CrudRepository<PasswordResetToken>(
  prisma,
  "passwordResetToken"
);
export const passTokenService = new CrudService<PasswordResetToken>(
  passTokenRepository
);
