import { getAllLectures } from "@/api/firebase/lecture";
import ResponsiveGrid from "@/components/grid";

export default async function LecturesPage() {
  const lectures = await getAllLectures();
  console.log(lectures);
  return (
    <>
      <ResponsiveGrid items={lectures} />
    </>
  );
}
