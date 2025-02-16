"use server";
import { purchaseService } from ".";
import { cookies } from "next/headers";

export const purchaseItems = async (productIds: string[]) => {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userid")?.value;
    if (!userId) {
      return null;
    }
    const result = await purchaseService.createMany(
      productIds.map((productId) => ({
        userId,
        productId,
        purchasedAt: new Date(),
      }))
    );

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
      //purchasedAt: new Date(),
    });
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};

type Purchase = {
  id: string;
  purchasedAt: string;
  product: {
    id: string;
    slug: string;
    lecture?: { id: string };
    lectures?: { id: string }[];
  };
};

function extractUniqueLectureIds(purchases: Purchase[]): string[] {
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
