import { getLecture } from "@/api/firebase/lecture";
import { LectureMain } from "@/components/lecture";
import { Box, Paper } from "@mui/material";

export default async function LecturePage({
  params, //: { slug },
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const lectureSlug = decodeURIComponent(slug);
  const lecture = await getLecture(lectureSlug);
  if (!lecture) {
    return <h1>Eğitim bulunamadı</h1>;
  }

  return (
    <>
      {/*  {!!lecture.product && (
        <section
          id='product'
          className='responsive'
          style={{ paddingBottom: 32 }}
        >
          <MiniProduct product={lecture.product} />
        </section>
      )} */}

      <Box
        component='section'
        className='responsive'
        sx={{
          //py: { xs: 2, sm: 8, md: 12 },
          whiteSpace: "break-spaces",
          fontFamily: "Lexend, sans-serif",
        }}
      >
        <Paper sx={{ px: 4, py: 3, boxShadow: 2 }} elevation={0}>
          <LectureMain data={lecture} />
        </Paper>
      </Box>
    </>
  );
}
