import { getAllLectures } from "@/api/lectures";
import { getUserAccess } from "@/api/lectures/access";
import { getAllSets } from "@/api/products";
import ResponsiveGrid from "@/components/grid";
import ProductGrid from "@/components/grid/ProductGrid";
import { Box } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eğitimler - Online Satranç Okulu",
  description: "Tüm Eğitim Serileri - Online Satranç Okulu - Vahap Şanal",
};

export const dynamic = "force-dynamic"; // Force dynamic rendering

export default async function LecturesPage() {
  const sets: any[] = await getAllSets();
  /* const permissions = await getUserAccess();

  const items = sets.map((lecture) => ({
    ...lecture,
    hasAccess: permissions?.some((perm) => perm.lectureId === lecture.id),
  })); */
  return (
    <Box className='responsive'>
      <ProductGrid items={sets} />
    </Box>
  );
}
