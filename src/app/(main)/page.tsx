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
    <Box className='responsive'>
      <ResponsiveGrid items={items} slug={"egitimler"} />
    </Box>
  );
}
