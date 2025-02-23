import { getAllLectures } from "@/api/lectures";
import ResponsiveGrid from "@/components/grid";
import { Box } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eğitimler - Online Satranç Okulu",
  description: "Tüm Eğitim Serileri - Online Satranç Okulu - Vahap Şanal",
};

export const dynamic = "force-dynamic"; // Force dynamic rendering

export default async function LecturesPage() {
  const lectures: any[] = await getAllLectures();

  return (
    <Box className='responsive'>
      <ResponsiveGrid items={lectures} slug={"egitimler"} />
    </Box>
  );
}
