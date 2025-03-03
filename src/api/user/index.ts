import { Account } from "@prisma/client";
import { CrudRepository, CrudService } from "../prisma/crud";
import prisma from "../prisma/init";

export const userRepository = new CrudRepository<Account>(prisma, "account");
export const userService = new CrudService<Account>(userRepository);
