import { getLectureBySlug } from "@/api/lectures";
import { LectureMain } from "@/components/lecture";
import { Box, Typography } from "@mui/material";
export const dynamic = "force-dynamic"; // Force dynamic rendering

export default async function LecturePage({ params }: { params: any }) {
  const { slug } = await params;
  //const lectureSlug = decodeURIComponent(slug);
  const lecture = await getLectureBySlug(slug);
  if (!lecture) {
    return (
      <Typography
        component={"h1"}
        variant={"h4"}
        sx={{
          px: "16px",
          py: { xs: "64px", sm: "80px", md: "96px", lg: "160px", xl: "200px" },
          fontWeight: 600,
          fontSize: 32,
          fontFamily: "Lexend, Roboto, sans-serif",
          opacity: 0.95,
        }}
      >
        Eğitim bulunamadı
      </Typography>
    );
  }

  return (
    <>
      <Box
        component='section'
        className='responsive'
        sx={{
          whiteSpace: "break-spaces",
          fontFamily: "Lexend, sans-serif",
        }}
      >
        <LectureMain data={lecture} />
      </Box>
    </>
  );
}
