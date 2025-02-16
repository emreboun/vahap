import { getAllLectures } from "@/api/lectures";
import ResponsiveGrid from "@/components/grid";
import { Box } from "@mui/material";

export const dynamic = "force-dynamic"; // Force dynamic rendering

export default async function LecturesPage() {
  const lectures = await getAllLectures();

  return (
    <Box className='responsive'>
      <ResponsiveGrid items={lectures} />
    </Box>
  );
}
