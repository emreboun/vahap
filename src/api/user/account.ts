"use server";
import { userService } from ".";

export const getAllUsers = async () => {
  return await userService.findAll({ role: "user" });
};

export const updateUser = async (id: string, data: any) => {
  try {
    const result = await userService.update(id, {
      ...data,
    });
    return result;
  } catch (e) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const result = await userService.findById(id, true);
    return result;
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};
