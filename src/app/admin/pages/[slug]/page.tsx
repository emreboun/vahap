import { getPageBySlug } from "@/api/pages";
import { EditPage } from "@/components/admin/pages";

export default async function AdminEditPage({ params }: any) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  return (
    <>
      <EditPage data={page} />
    </>
  );
}
