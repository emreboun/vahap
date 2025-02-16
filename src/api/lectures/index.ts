"use server";
import { Lecture } from "@prisma/client";
import { CrudRepository, CrudService } from "../prisma/crud";

import prisma from "../prisma/init";

const lectureRepository = new CrudRepository<Lecture>(prisma, "lecture");
const lectureService = new CrudService<Lecture>(lectureRepository);

export const getAllLectures = async () => {
  return await lectureService.findMany({ status: true }, false, {
    order: "desc",
  });
};

export const getAllLecturesAdmin = async () => {
  return await lectureService.findAll();
};

export const createLecture = async (
  data: Partial<Lecture> & { price: number }
) => {
  try {
    const {
      slug,
      name,
      description,
      mainVideo,
      introVideo,
      introThumbnail,
      mainThumbnail,
      duration,
      price,
    } = data;

    const result = await lectureService.create({
      slug,
      name,
      description,
      mainVideo,
      introVideo,
      introThumbnail,
      mainThumbnail,
      duration: Number(duration),
      mainProduct: {
        slug,
        name,
        description,
        price: Number(price),
        imgUrl: mainThumbnail,
      },
    });

    return result;
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

export const getLectureBySlug = async (slug: string) => {
  try {
    const result = await lectureService.findByUniqueProperty(
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

export const updateLecture = async (id: string, data: any) => {
  try {
    await lectureService.update(id, data);
    return true;
  } catch (e) {
    return false;
  }
};

export const deleteLecture = async (id: string) => {
  try {
    await lectureService.delete(id);
    return true;
  } catch (e) {
    return false;
  }
};

export const getLectureSlugPrefix = async (slug: string) => {
  try {
    const result = await lectureRepository.getListBySlugPrefix(slug);
    console.log(result);
    return result;
  } catch (e) {
    return null;
  }
};
