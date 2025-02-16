import { getLectureBySlug } from "@/api/lectures";
import { getUserPurchases } from "@/api/user/purchase";
import { LectureMain } from "@/components/lecture";
import { Box, Typography } from "@mui/material";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic"; // Force dynamic rendering

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function LecturePage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const userId = cookieStore.get("userid")?.value;
  let purchases: string[] = [];
  if (userId) {
    purchases = (await getUserPurchases(userId)) ?? [];
  }
  //const { query } = await searchParams;
  //console.log(query);
  //const lectureSlug = decodeURIComponent(slug);
  const lecture = await getLectureBySlug(slug);
  const hasAccess = lecture && purchases?.some((p) => p === lecture.id);

  const opts = {
    auth: !!userId,
    hasAccess,
  };

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
        {"Eğitim bulunamadı"}
      </Typography>
    );
  }

  return (
    <>
      <>
        <LectureMain slug={slug} data={lecture} opts={opts} />
      </>
    </>
  );
}
