"use server";
import { Address } from "@prisma/client";
import { CrudRepository, CrudService } from "../prisma/crud";
import prisma from "../prisma/init";

const addressRepository = new CrudRepository<Address>(prisma, "address");
const addressService = new CrudService<Address>(addressRepository);

export const createAddress = async (userId: string, data: any) => {
  try {
    console.log(userId);
    console.log(data);
    const { title, address, city, country, fullName } = data;
    const result = await addressService.create({
      userId,
      title,
      address,
      city,
      country,
      fullName,
    });
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};
