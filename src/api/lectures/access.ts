"use server";
import { UserLectureAccess } from "@prisma/client";
import { CrudRepository, CrudService } from "../prisma/crud";

import prisma from "../prisma/init";
import { getCurrentUserId } from "../user/auth";
import { userService } from "../user";

const lectureAccessRepository = new CrudRepository<UserLectureAccess>(
  prisma,
  "userLectureAccess"
);
const lectureAccessService = new CrudService<UserLectureAccess>(
  lectureAccessRepository
);

export const getUserPermissions = async (userId: string) => {
  try {
    const result: any[] = await lectureAccessService.findAll({ userId });
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getUserAccess = async () => {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return [];
    }
    const permissions = (await getUserPermissions(userId)) ?? [];

    return permissions;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const grantUserAccess = async (userId: string, ids: string[]) => {
  try {
    console.log(userId);
    console.log(ids);
    const result = await lectureAccessService.createMany(
      ids.map((lectureId) => ({ userId, lectureId }))
    );

    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getUserWithLectures = async () => {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return null;
    }

    const user = await userService.findById(userId);

    const permissions: any[] = await lectureAccessService.findAll(
      { userId },
      {
        //user: { select: { firstName: true, email: true, lastName: true } },
        lecture: {
          select: {
            slug: true,
            name: true,
            duration: true,
            minElo: true,
            maxElo: true,
            resources: true,
          },
        },
      },
      { grantedAt: "desc" }
    );

    return {
      user,
      permissions: permissions.map((per) => ({
        ...per,
        lecture: { ...per.lecture, pgnCount: per.lecture.resources.length },
      })),
    };
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getUserWithLecturesById = async (userId: string) => {
  try {
    const user = await userService.findById(userId);

    const permissions: any[] = await lectureAccessService.findAll(
      { userId },
      {
        //user: { select: { firstName: true, email: true, lastName: true } },
        lecture: {
          select: {
            slug: true,
            name: true,
            duration: true,
            minElo: true,
            maxElo: true,
            resources: true,
          },
        },
      },
      { grantedAt: "desc" }
    );

    return {
      user,
      permissions: permissions.map((per) => ({
        ...per,
        lecture: { ...per.lecture, pgnCount: per.lecture.resources.length },
      })),
    };
  } catch (e) {
    console.error(e);
    return [];
  }
};
