"use server";
import { Cart } from "@prisma/client";
import { CrudRepository, CrudService } from "../prisma/crud";

import prisma from "../prisma/init";
import { getProductSlugPrefix } from ".";
import { generateUrlSlug } from "@/components/admin/utils";

const cartRepository = new CrudRepository<Cart>(prisma, "cart");
const cartService = new CrudService<Cart>(cartRepository);

export const createCart = async (data: any) => {
  const { userId, token, totalPrice, products } = data;

  const result = await cartService.create({
    userId,
    token,
    totalPrice,
    cartItems: products.map((product: any) => ({
      productId: product.id,
      price: product.price,
    })),
  });

  return result;
};

export const getAllCartsAdmin = async () => {
  const result: any[] = await cartService.findMany(undefined, false);

  return result;
};

export const getCartById = async (id: string) => {
  try {
    const result = await cartService.findById(id, true);
    return result;
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

export const getCartByToken = async (token: string) => {
  try {
    const result = await cartService.findByUniqueProperty("token", token, true);
    return result;
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

export const updateCart = async (id: string, data: Partial<Cart>) => {
  try {
    const { status } = data;
    const result = await cartService.update(id, { status });
    return result;
  } catch (e) {
    return null;
  }
};

export const deleteCart = async (id: string) => {
  try {
    await cartService.delete(id);
    return true;
  } catch (e) {
    return false;
  }
};
