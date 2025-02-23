import { Account } from "@prisma/client";
import { CrudRepository, CrudService } from "../prisma/crud";
import prisma from "../prisma/init";

export const userRepository = new CrudRepository<Account>(prisma, "account");
export const userService = new CrudService<Account>(userRepository);

/* 
import { User, Purchase } from "@prisma/client";
import { CrudRepository, CrudService } from "../prisma/crud";
import prisma from "../prisma/init";
import { v4 } from "uuid";

const userRepository = new CrudRepository<User>(prisma, "user");
const userService = new CrudService<User>(userRepository);



export const getAllUsers = async () => {
  return await userService.findAll();
};

export const getUserById = async (id: string) => {
  try {
    const result = await userService.findById(id);
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const result = await userService.findByUniqueProperty("email", email);
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const createUser = async (data: Partial<User>) => {
  try {
    const { email, firstName, lastName, phone, password } = data;
    const result = await userService.create({
      id: v4(),
      phone,
      email,
      firstName,
      lastName,
      password,
      purchases: [],
    });
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const updateUser = async (id: string, data: Partial<User>) => {
  try {
    const result = await userService.update(id, data);
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const deleteUser = async (id: string) => {
  try {
    await userService.delete(id);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const purchaseItem = async (userId: string, productId: string) => {
  try {
    const result = await purchaseService.create({
      userId,
      productId,
      purchasedAt: new Date(),
    });
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getUserPurchases = async (userId: string) => {
  try {
    const result = await purchaseService.findAll({ userId });
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};

//
 */
