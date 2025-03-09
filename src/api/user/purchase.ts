"use server";
import { cookies } from "next/headers";
import prisma from "../prisma/init";
import { Purchase } from "@prisma/client";
import { CrudRepository, CrudService } from "../prisma/crud";

const purchaseRepository = new CrudRepository<Purchase>(prisma, "purchase");
const purchaseService = new CrudService<Purchase>(purchaseRepository);

export const getAllPurchasesAdmin = async () => {
  const result = await purchaseService.findAll(
    undefined,
    { product: true, user: true },
    {
      purchasedAt: "desc",
    }
  );
  return result;
};

export const purchaseItems = async (userId: string, productIds: string[]) => {
  try {
    // Fetch all lectures associated with the purchased products
    const lectures = await prisma.lecture.findMany({
      where: {
        OR: [
          { productId: { in: productIds } }, // Directly linked as a main product
          { products: { some: { productId: { in: productIds } } } }, // Related via ProductLecture
        ],
      },
      select: {
        id: true,
      },
    });

    const lectureAccessEntries = lectures.map((lecture) => ({
      userId,
      lectureId: lecture.id,
      //grantedAt: new Date(),
    }));

    // Fetch all event tickets associated with the purchased products
    const eventTickets = await prisma.eventTicket.findMany({
      where: {
        productId: { in: productIds },
      },
      select: {
        id: true,
        productId: true,
      },
    });

    // Transaction: Create purchases & user lecture access
    const result = await prisma.$transaction([
      prisma.purchase.createMany({
        data: productIds.map((productId) => ({
          userId,
          productId,
          purchasedAt: new Date(),
        })),
      }),
      prisma.userLectureAccess.createMany({
        data: lectureAccessEntries,
        skipDuplicates: true, // Prevent duplicate entries
      }),

      // Increment sold count for event tickets
      ...eventTickets.map((ticket) =>
        prisma.eventTicket.update({
          where: { id: ticket.id },
          data: { sold: { increment: 1 } },
        })
      ),
    ]);
    console.log(result);
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const purchaseItem = async (userId: string, productId: string) => {
  try {
    const result = await purchaseService.create({
      userId,
      productId,
    });
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};

type PurchaseEntity = {
  id: string;
  purchasedAt: string;
  product: {
    id: string;
    slug: string;
    lecture?: { id: string };
    lectures?: { id: string }[];
  };
};

function extractUniqueLectureIds(purchases: PurchaseEntity[]): string[] {
  const lectureIds = new Set<string>();

  for (const purchase of purchases) {
    if (purchase.product.lecture) {
      lectureIds.add(purchase.product.lecture.id);
    }
    if (purchase.product.lectures) {
      for (const lecture of purchase.product.lectures) {
        lectureIds.add(lecture.id);
      }
    }
  }

  return Array.from(lectureIds);
}

export const getUserPurchases = async (userId: string) => {
  try {
    const result: any[] = await purchaseService.findAll(
      { userId },
      {
        product: {
          select: {
            id: true,
            slug: true,
            lecture: {
              select: {
                id: true,
              },
            },
            lectures: {
              select: {
                lectureId: true,
              },
            },
          },
        },
        userId: false,
        productId: false,
      }
    );
    return extractUniqueLectureIds(result);
  } catch (e) {
    console.log(e);
    return null;
  }
};
