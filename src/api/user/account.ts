"use server";
import { userService } from ".";

export const getAllUsers = async () => {
  return await userService.findAll({ role: "user" });
};
