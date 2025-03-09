"use server";
import bcrypt from "bcryptjs";
import prisma from "../prisma/init";

import { userService } from ".";
import { redirect } from "next/navigation";
import { sendEmail } from "./email";

export const getAllUsers = async () => {
  return await userService.findAll(/* { role: "user" } */);
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

export const addIdNumber = async (id: string, idNumber: string) => {
  console.log(id);
  console.log(idNumber);
  return await updateUser(id, { idNumber });
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

export const resetUserPassword = async (
  userId: string,
  newPassword: string
) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await userService.update(userId, {
      password: hashedPassword,
    });
    if (!!result) {
      const temp = await prisma.passwordResetToken.delete({
        where: { userId },
      });
      await sendEmail(result.email, "resetPassSuccess");
      redirect("/giris");
    }
    return result;
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};
