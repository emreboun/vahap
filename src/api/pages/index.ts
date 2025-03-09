"use server";
import { Page } from "@prisma/client";
import { CrudRepository, CrudService } from "../prisma/crud";

import prisma from "../prisma/init";

const pageRepository = new CrudRepository<Page>(prisma, "page");
const pageService = new CrudService<Page>(pageRepository);

export const getPageBySlug = async (slug: string) => {
  try {
    const result: any = await pageService.findByUniqueProperty("slug", slug);
    return result;
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

export const getPageById = async (id: string) => {
  try {
    const result: any = await pageService.findById(id, true);

    return result;
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

export const updatePage = async (id: string, data: any, process?: boolean) => {
  try {
    const result = await pageService.update(id, data, process);
    return result;
  } catch (e) {
    return false;
  }
};
