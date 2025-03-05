"use server";
import { Product } from "@prisma/client";
import { CrudRepository, CrudService } from "../prisma/crud";

import prisma from "../prisma/init";
import { getCurrentUserId } from "../user/auth";

const productRepository = new CrudRepository<Product>(prisma, "product");
const productService = new CrudService<Product>(productRepository);

export const getDiscountedProducts = async () => {
  const userId = await getCurrentUserId();

  const purchasedProductIds = userId
    ? await prisma.purchase
        .findMany({
          where: { userId },
          select: { productId: true },
        })
        .then((purchases) => purchases.map((p) => p.productId))
    : [];

  const result: any[] = await productService.findMany(
    {
      status: true,
      ...(userId ? { id: { notIn: purchasedProductIds } } : {}), // Exclude purchased products if logged in
    },
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
      lecture: {
        select: {
          id: true,
          duration: true,
          resources: { select: { type: true } },
          minElo: true,
          maxElo: true,
        },
      },
      lectures: {
        select: {
          lecture: {
            select: {
              id: true,
              duration: true,
              minElo: true,
              maxElo: true,
              resources: { select: { type: true } },
            },
          },
        },
      },
      eventTicket: {
        select: {
          id: true,
          name: true,
          date: true,
          location: true,
          capacity: true,
          url: true,
          sold: true,
        },
      },
    },
    {
      discount: "desc",
    },
    1,
    6 //4
  );

  return result
    .map((item) => {
      const lectures = item.lectures?.map((l: any) => l.lecture) || [];

      const lectureDuration = item.lecture?.duration || 0;
      const lecturesDuration = item.lectures?.reduce(
        (
          sum: number,
          lectureContainer: { lecture: { duration: number | null } }
        ) => sum + (lectureContainer.lecture.duration || 0),
        0
      );

      const lecturePgns = item.lecture?.pgnCount || 0;
      const lecturesPgns = item.lectures?.reduce(
        (sum: number, lectureContainer: { lecture: { resources: any[] } }) =>
          sum + (lectureContainer.lecture.resources.length || 0),
        0
      );

      const minMinElo =
        lectures.length > 0
          ? Math.min(
              ...lectures
                .map((l: any) => l.minElo)
                .filter((e: any) => e !== null)
            )
          : null;

      const maxMaxElo =
        lectures.length > 0
          ? Math.max(
              ...lectures
                .map((l: any) => l.maxElo)
                .filter((e: any) => e !== null)
            )
          : null;

      return {
        minElo: minMinElo,
        maxElo: maxMaxElo,
        ...item,
        files: undefined,
        thumbnail: item.files[0]?.path,
        duration: lectureDuration || lecturesDuration || 0, // Use single lecture duration if exists, otherwise sum multiple lectures
        pgnCount: lecturePgns || lecturesPgns || 0,
      };
    })
    .filter((item) => item.discount > 0);
};

export const getAllProducts = async () => {
  const result: any[] = await productService.findMany(
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
    },
    {
      order: "desc",
    }
  );

  return result.map((item) => ({
    ...item,
    files: undefined,
    thumbnail: item.files[0]?.path,
  }));
};

export const getAllTickets = async () => {
  const result: any[] = await productService.findMany(
    {
      status: true,
      eventTicket: { isNot: null, is: { date: { gte: new Date() } } }, // Ensures the event date is in the future
    },
    {
      eventTicket: true,
    },
    {}
    /* 1,
    6 */
  );

  return result;
};

export const getAllSets = async () => {
  const result: any[] = await productService.findMany(
    {
      status: true,
      lectures: { some: {} }, // Ensures the event date is in the future
    },
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
      lecture: {
        select: {
          id: true,
          duration: true,
          resources: { select: { type: true } },
          minElo: true,
          maxElo: true,
        },
      },
      lectures: {
        select: {
          lecture: {
            select: {
              id: true,
              duration: true,
              minElo: true,
              maxElo: true,
              resources: { select: { type: true } },
            },
          },
        },
      },
      eventTicket: {
        select: {
          id: true,
          name: true,
          date: true,
          location: true,
          capacity: true,
          url: true,
          sold: true,
        },
      },
    },
    {},
    1,
    6
  );

  return result.map((item) => {
    const lectures = item.lectures?.map((l: any) => l.lecture) || [];

    const lectureDuration = item.lecture?.duration || 0;
    const lecturesDuration = item.lectures?.reduce(
      (
        sum: number,
        lectureContainer: { lecture: { duration: number | null } }
      ) => sum + (lectureContainer.lecture.duration || 0),
      0
    );

    const lecturePgns = item.lecture?.pgnCount || 0;
    const lecturesPgns = item.lectures?.reduce(
      (sum: number, lectureContainer: { lecture: { resources: any[] } }) =>
        sum + (lectureContainer.lecture.resources.length || 0),
      0
    );

    const minMinElo =
      lectures.length > 0
        ? Math.min(
            ...lectures.map((l: any) => l.minElo).filter((e: any) => e !== null)
          )
        : null;

    const maxMaxElo =
      lectures.length > 0
        ? Math.max(
            ...lectures.map((l: any) => l.maxElo).filter((e: any) => e !== null)
          )
        : null;

    return {
      minElo: minMinElo,
      maxElo: maxMaxElo,
      ...item,
      files: undefined,
      thumbnail: item.files[0]?.path,
      duration: lectureDuration || lecturesDuration || 0, // Use single lecture duration if exists, otherwise sum multiple lectures
      pgnCount: lecturePgns || lecturesPgns || 0,
    };
  });
};

export const getAllProductsAdmin = async () => {
  const result: any[] = await productService.findMany(undefined, {
    eventTicket: true,
    lecture: true,
  });
  return result;
};

export const createProduct = async (data: any /* Partial<Product> */) => {
  // try {
  const { slug, name, description, price, discount, lectures } = data;

  const result = await productService.create({
    slug,
    name,
    description,
    price: Number(price),
    discount,
    /* lectures: {
      create: lectures.map((lecture: any) => ({
        lecture: { connect: { id: lecture.id } },
      })),
    }, */
  });

  const second = await prisma.productLecture.createMany({
    data: lectures.map((lec: any) => ({
      lectureId: lec.id,
      productId: result.id,
    })),
  });

  return { ...result, lectures: second };
  /* } catch (e: unknown) {
    console.log(e);
    return null;
  } */
};

export const getProductBySlug = async (slug: string) => {
  try {
    const result: any = await productService.findByUniqueProperty(
      "slug",
      slug,
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
        lecture: {
          select: {
            id: true,
            duration: true,
            resources: { select: { type: true } },
            minElo: true,
            maxElo: true,
          },
        },
        lectures: {
          select: {
            lecture: {
              select: {
                id: true,
                slug: true,
                name: true,
                duration: true,
                minElo: true,
                maxElo: true,
                resources: { select: { type: true } },
              },
            },
          },
        },
        eventTicket: {
          select: {
            id: true,
            name: true,
            date: true,
            location: true,
            capacity: true,
            url: true,
            sold: true,
          },
        },
      }
    );

    const lectureDuration = result.lecture?.duration || 0;
    const lecturesDuration = result.lectures?.reduce(
      (
        sum: number,
        lectureContainer: { lecture: { duration: number | null } }
      ) => sum + (lectureContainer.lecture?.duration || 0),
      0
    );

    const lecturePgns = result.lecture?.pgnCount || 0;
    const lecturesPgns = result.lectures?.reduce(
      (sum: number, lectureContainer: { lecture: { resources: any[] } }) =>
        sum + (lectureContainer.lecture?.resources.length || 0),
      0
    );
    const minMinElo =
      result.lectures?.length > 0
        ? Math.min(
            ...result.lectures
              .map((l: any) => l.lecture.minElo)
              .filter((e: any) => e !== null)
          )
        : null;

    const maxMaxElo =
      result.lectures?.length > 0
        ? Math.max(
            ...result.lectures
              .map((l: any) => l.lecture.maxElo)
              .filter((e: any) => e !== null)
          )
        : null;

    return {
      minElo: minMinElo,
      maxElo: maxMaxElo,
      ...result,
      files: undefined,
      thumbnail: result.files[0]?.path,
      duration: lectureDuration || lecturesDuration || 0, // Use single lecture duration if exists, otherwise sum multiple lectures
      pgnCount: lecturePgns || lecturesPgns || 0,
    };
    console.log(result);
    return { ...result, files: undefined, thumbnail: result.files[0]?.path };
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

export const getProductById = async (id: string) => {
  try {
    console.log(id);
    const result = await productService.findById(id, true);
    console.log(result);
    return result;
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
};

export const updateProduct = async (id: string, data: Partial<Product>) => {
  try {
    const result = await productService.update(id, {
      ...data,
      discount: !!data.discount ? Number(data.discount) : undefined,
    });
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

export const getProductSlugPrefix = async (slug: string) => {
  try {
    const result = await productRepository.getListBySlugPrefix(slug);
    console.log(result);
    return result;
  } catch (e) {
    return null;
  }
};
