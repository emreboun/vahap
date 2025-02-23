"use server";

import { LectureResource } from "@prisma/client";
import { CrudRepository, CrudService } from "../prisma/crud";

import prisma from "../prisma/init";

const lectureResourceRepository = new CrudRepository<LectureResource>(
  prisma,
  "lectureResource"
);
const lectureResourceService = new CrudService<LectureResource>(
  lectureResourceRepository
);

export const addLectureResource = async (
  lectureId: string,
  resource: Partial<LectureResource>
) => {
  try {
    const result = await lectureResourceService.create({
      ...resource,
      lectureId,
    });
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const deleteLectureResource = async (resourceId: string) => {
  try {
    const result = await lectureResourceService.delete(resourceId);
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const updateLectureResourceContent = async (
  resourceId: string,
  data: any
) => {
  try {
    const result = await lectureResourceService.update(resourceId, data);
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const addLectureResourceList = async (
  lectureId: string,
  resources: any[]
) => {
  try {
    const result = await lectureResourceService.createMany([
      ...resources.map((res) => ({
        ...res,
        lectureId,
      })),
    ]);
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
};
