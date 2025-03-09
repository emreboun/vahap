"use server";
import { Lecture } from "@prisma/client";
import { CrudRepository, CrudService } from "../prisma/crud";

import prisma from "../prisma/init";
import { getProductSlugPrefix } from "../products";

const lectureRepository = new CrudRepository<Lecture>(prisma, "lecture");
const lectureService = new CrudService<Lecture>(lectureRepository);

export const getLatestThreeLectures = async () => {
  const result: any[] = await lectureService.findMany(
    { status: true },
    {
      files: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          path: true,
        },
      },
      mainProduct: true,
      resources: true,
    },
    {
      createdAt: "desc",
    },
    1,
    3
  );
  return result.map((item) => ({
    ...item,
    files: undefined,
    thumbnail: "", //item.files[0].path,
  }));
};

export const getThreeLectures = async () => {
  const result: any[] = await lectureService.findMany(
    { status: true },
    {
      files: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          path: true,
        },
      },
      mainProduct: true,
      resources: true,
    },
    {
      order: "desc",
    },
    1,
    3
  );
  return result.map((item) => ({
    ...item,
    files: undefined,
    thumbnail: "", // item.files[0].path,
  }));
};

export const getAllLectures = async (userId?: string) => {
  const result: any[] = await lectureService.findMany(
    { status: true },
    {
      files: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          path: true,
        },
      },
      mainProduct: true,
      resources: true,
    },
    {
      order: "desc",
    }
  );
  return result.map((item) => ({
    ...item,
    files: undefined,
    thumbnail: "", //item.files[0].path,
  }));
};

export const getAllLecturesAdmin = async () => {
  return await lectureService.findAll(undefined, { resources: true });
};

export const createLecture = async (
  data: Partial<Lecture> & { price: number; discount?: number }
) => {
  try {
    const {
      slug,
      name,
      description,
      mainVideo,
      introVideo,
      thumbnail,
      duration,
      minElo,
      maxElo,
      price,
      discount,
      status,
    } = data;

    if (!slug) {
      return;
    }

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

    const result = await lectureService.create({
      slug,
      name,
      description,
      mainVideo,
      introVideo,
      thumbnail,
      status,
      minElo: Number(minElo),
      maxElo: Number(maxElo),
      duration: Number(duration),
      mainProduct: {
        slug: productSlug,
        name,
        description,
        price: Number(price),
        discount: discount ? Number(discount) : undefined,
        status,
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
    const result: any = await lectureService.findByUniqueProperty(
      "slug",
      slug,
      {
        resources: true,
        mainProduct: true,
        products: true,
        files: {
          take: 1,
          orderBy: { createdAt: "desc" },
          select: {
            path: true,
          },
        },
      }
    );
    const { files = [] } = result;
    return {
      ...result,
      files: undefined,
      thumbnail: "", //files[0].path
    };
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

export const getLectureById = async (id: string) => {
  try {
    const result: any = await lectureService.findById(id, true);

    const { files = [] } = result;
    return {
      ...result,
      files: undefined,
      thumbnail: "", // files[0].path
    };
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

export const updateLecture = async (
  id: string,
  data: any,
  process?: boolean
) => {
  try {
    const result = await lectureService.update(id, data, process);
    return result;
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
    return result;
  } catch (e) {
    return null;
  }
};

export const searchLectures = async (query: string) => {
  const searchTerm = query.trim();

  const result = await prisma.lecture.findMany({
    where: {
      status: true,
      OR: [
        {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {},
  });
  return result; //sortByRelevance(result, searchTerm);
};
