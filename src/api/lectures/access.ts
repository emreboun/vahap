"use server";
import { UserLectureAccess } from "@prisma/client";
import { CrudRepository, CrudService } from "../prisma/crud";

import prisma from "../prisma/init";
import { getProductSlugPrefix } from "../products";
import { getCurrentUserId } from "../user/auth";

const lectureAccessRepository = new CrudRepository<UserLectureAccess>(
  prisma,
  "userLectureAccess"
);
const lectureAccessService = new CrudService<UserLectureAccess>(
  lectureAccessRepository
);

export const getUserPermissions = async (userId: string) => {
  try {
    /* const userId = await getCurrentUserId();
    if (!userId) {
      return [];
    } */
    const result: any[] = await lectureAccessService.findAll({ userId });
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};
