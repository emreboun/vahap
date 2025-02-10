import { getAllLectures } from "@/api/lectures";
import ResponsiveGrid from "@/components/grid";

export const dynamic = "force-dynamic"; // Force dynamic rendering

export default async function LecturesPage() {
  const lectures = await getAllLectures();
  console.log(lectures);
  return (
    <>
      <ResponsiveGrid items={lectures} />
    </>
  );
}
