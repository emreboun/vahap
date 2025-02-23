"use server";
import { EventTicket } from "@prisma/client";
import { CrudRepository, CrudService } from "../prisma/crud";

import prisma from "../prisma/init";
import { getCurrentUserId } from "../user/auth";
import { getProductSlugPrefix } from ".";
import { generateUrlSlug } from "@/components/admin/utils";

const eventTicketRepository = new CrudRepository<EventTicket>(
  prisma,
  "eventTicket"
);
const ticketService = new CrudService<EventTicket>(eventTicketRepository);

export const createTicket = async (data: any /*  Partial<EventTicket> */) => {
  // try {
  const { name, date, url, location, capacity, sold, price, discount, status } =
    data;

  const slug = generateUrlSlug(name);

  const productListWithSlug = await getProductSlugPrefix(slug);
  const productExists = productListWithSlug.some((p: any) => p.slug === slug);
  let productSlug = slug;
  if (productExists) {
    let i = 2;
    productSlug = slug + "-" + i;
    while (productListWithSlug.some((p: any) => p.slug === productSlug)) {
      i++;
      productSlug = slug + "-" + i;
    }
  }

  const result = await ticketService.create({
    name,
    date,
    url,
    location,
    capacity,
    sold,
    product: {
      slug,
      name,
      price,
      discount,
      status,
    },
  });

  return result;
};

export const getAllTicketsAdmin = async () => {
  const result: any[] = await ticketService.findMany(undefined, false);

  return result;
};

export const getTicketById = async (id: string) => {
  try {
    console.log(id);
    const result = await ticketService.findById(id, true);
    console.log(result);
    return result;
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

export const updateTicket = async (id: string, data: Partial<EventTicket>) => {
  try {
    const result = await ticketService.update(id, data);
    return result;
  } catch (e) {
    return null;
  }
};

export const deleteTicket = async (id: string) => {
  try {
    await ticketService.delete(id);
    return true;
  } catch (e) {
    return false;
  }
};
