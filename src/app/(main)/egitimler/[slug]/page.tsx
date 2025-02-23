import { getLectureBySlug } from "@/api/lectures";
import { getUserPermissions } from "@/api/lectures/access";
import { getUserPurchases } from "@/api/user/purchase";
import { parseUrlSlug } from "@/components/admin/utils";
import { LectureMain } from "@/components/lecture";
import { Typography } from "@mui/material";
import { cookies } from "next/headers";

// or Dynamic metadata
export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const title = parseUrlSlug(slug);
  return {
    title: `${title} - Online Satranç Okulu`,
    description: `${title} Eğitimi - Online Satranç Okulu`,
  };
}

export const dynamic = "force-dynamic"; // Force dynamic rendering

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function LecturePage({
  params,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const userId = cookieStore.get("userid")?.value;
  let permissions: string[] = [];
  if (userId) {
    permissions = (await getUserPermissions(userId)) ?? [];
  }
  console.log(permissions);
  /* let purchases: string[] = [];
  if (userId) {
    purchases = (await getUserPurchases(userId)) ?? [];
  } */

  const lecture = await getLectureBySlug(slug);
  const hasAccess =
    lecture && permissions?.some((p: any) => p.lectureId === lecture.id);

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
