import { Box } from "@mui/material";
import { getAllLectures } from "@/api/lectures";
import ResponsiveGrid from "@/components/grid";
import { getUserAccess } from "@/api/lectures/access";

export default async function Home() {
  const lectures: any[] = await getAllLectures();
  const permissions = await getUserAccess();

  const items = lectures.map((lecture) => ({
    ...lecture,
    hasAccess: permissions?.some((perm) => perm.lectureId === lecture.id),
  }));

  return (
    <Box
      className='responsive'
      sx={{ pt: { xs: 0.8, sm: 0 }, pb: { xs: 1.6, sm: 0 } }}
    >
      <ResponsiveGrid items={items} slug={"egitimler"} />
    </Box>
  );
}
