import { Metadata } from "next";
import { Box } from "@mui/material";

import { getUserAccess } from "@/api/lectures/access";
import { getAllSets } from "@/api/products";
import ProductGrid from "@/components/grid/ProductGrid";

export const metadata: Metadata = {
  title: "Eğitim Setleri - Online Satranç Okulu",
  description: "Tüm Eğitim Serileri - Online Satranç Okulu - Vahap Şanal",
};

export const dynamic = "force-dynamic"; // Force dynamic rendering

export default async function SetsPage() {
  const sets: any[] = await getAllSets();
  const permissions = await getUserAccess();
  const lectureIds = permissions?.map((perm) => perm.lectureId);

  const items = sets.map((product) => ({
    ...product,
    hasAccess: !product.lectures.some(
      (lect: any) => !lectureIds?.some((id) => id === lect.lecture.id)
    ),
  }));

  return (
    <Box className='responsive'>
      <ProductGrid items={items} />
    </Box>
  );
}
