import { getAllLectures } from "@/api/lectures";
import { getUserAccess } from "@/api/lectures/access";
import { getAllTickets } from "@/api/products";
import ResponsiveGrid from "@/components/grid";
import ProductGrid from "@/components/grid/ProductGrid";
import { Box } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eğitimler - Online Satranç Okulu",
  description: "Tüm Eğitim Serileri - Online Satranç Okulu - Vahap Şanal",
};

export const dynamic = "force-dynamic"; // Force dynamic rendering

export default async function TicketsPage() {
  const tickets: any[] = await getAllTickets();
  /*  const permissions = await getUserAccess();

  const items = lectures.map((lecture) => ({
    ...lecture,
    hasAccess: permissions?.some((perm) => perm.lectureId === lecture.id),
  })); */
  return (
    <Box className='responsive'>
      <ProductGrid items={tickets} />
    </Box>
  );
}
