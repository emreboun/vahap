"use server";
import { Product } from "@prisma/client";
import { CrudRepository, CrudService } from "../prisma/crud";

import prisma from "../prisma/init";

const productRepository = new CrudRepository<Product>(prisma, "product");
const productService = new CrudService<Product>(productRepository);

export const getAllProducts = async () => {
  return await productService.findAll();
};

export const createProduct = async (data: Partial<Product>) => {
  // try {
  const { slug, name, description, imgUrl, price } = data;
  const result = await productService.create({
    slug,
    name,
    description,
    imgUrl,
    price: Number(price),
  });

  return result;
  /* } catch (e: unknown) {
    console.log(e);
    return null;
  } */
};

export const getProductBySlug = async (slug: string) => {
  try {
    const result = await productService.findByUniqueProperty(
      "slug",
      slug,
      true
    );
    console.log(result);
    return result;
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

export const updateProduct = async (id: string, data: Partial<Product>) => {
  try {
    const result = await productService.update(id, data);
    return result;
  } catch (e) {
    return null;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await productService.delete(id);
    return true;
  } catch (e) {
    return false;
  }
};
