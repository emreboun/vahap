"use server";
import { File } from "@prisma/client";
import { CrudRepository, CrudService } from "../prisma/crud";

import prisma from "../prisma/init";

const fileRepository = new CrudRepository<File>(prisma, "file");
const fileService = new CrudService<File>(fileRepository);

export const getAllFiles = async () => {
  return await fileService.findAll();
};

export const createFile = async (data: Partial<File>) => {
  // try {
  const { filename, size, mimetype, path, lectureId } = data;
  const result = await fileService.create({
    filename,
    size,
    mimetype,
    path,
    lectureId,
  });

  return result;
  /* } catch (e: unknown) { 
    console.log(e);
    return null;
  } */
};

/* export const getFileBySlug = async (slug: string) => {
  try {
    const result = await fileService.findByUniqueProperty("slug", slug, true);
    console.log(result);
    return result;
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
}; */

export const updateFile = async (id: string, data: Partial<File>) => {
  try {
    const result = await fileService.update(id, data);
    return result;
  } catch (e) {
    return null;
  }
};

export const deleteFile = async (id: string) => {
  try {
    await fileService.delete(id);
    return true;
  } catch (e) {
    return false;
  }
};
