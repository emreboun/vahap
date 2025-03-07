"use server";
import { EventTicket } from "@prisma/client";
import { CrudRepository, CrudService } from "../prisma/crud";

import prisma from "../prisma/init";
import { getProductSlugPrefix } from ".";
import { generateUrlSlug } from "@/components/admin/utils";

const eventTicketRepository = new CrudRepository<EventTicket>(
  prisma,
  "eventTicket"
);
const ticketService = new CrudService<EventTicket>(eventTicketRepository);

export const createTicket = async (data: any /*  Partial<EventTicket> */) => {
  // try {
  const { name, date, url, location, capacity, price, discount, status } = data;

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
    const result = await ticketService.findById(id, true);
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
