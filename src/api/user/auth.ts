"use server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { userService } from ".";

export const signup = async (data: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
  idNumber?: string;
}) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await userService.create({
    //...data,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashedPassword,
    phone: data.phone,
    idNumber: data.idNumber,
  });
  const { id, idNumber, email, firstName, lastName, phone, role } = user;

  return { id, idNumber, email, firstName, lastName, phone, role };
};

export const login = async (email: string, password: string) => {
  const user: any = await userService.findByUniqueProperty("email", email, {
    purchases: true,
    permissions: true,
    addresses: {
      select: {
        id: true,
        title: true,
        fullName: true,
        address: true,
        city: true,
        country: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    },
  });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  const {
    id,
    firstName,
    lastName,
    idNumber,
    phone,
    role,
    purchases = [],
    addresses = [],
    permissions = [],
  } = user;

  return {
    user: {
      id,
      email,
      firstName,
      lastName,
      phone,
      idNumber,
      role,
      purchases,
      addresses,
      permissions,
    },
  };
};

export const getCurrentUserId = async () => {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userid")?.value;
    if (!userId) {
      return null;
    }

    return userId;
  } catch (e) {
    console.log(e);
    return null;
  }
};
