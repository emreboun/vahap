import { getLectureById } from "@/api/lectures";
import { getProductById } from "@/api/products";
import { EditLecture, EditProduct } from "@/components/admin/grid/form";

export default async function EditEntityPage({ params }: { params: any }) {
  const { table, id } = await params;

  let data: any;
  if (!table) {
    return null;
  }

  switch (table) {
    case "lectures":
      data = await getLectureById(id);
      break;
    case "products":
      data = await getProductById(id);
      break;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      {table === "lectures" && <EditLecture data={data} />}
      {table === "products" && <EditProduct data={data} />}
    </>
  );
}
