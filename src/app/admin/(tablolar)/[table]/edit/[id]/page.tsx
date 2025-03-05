import { getLectureById } from "@/api/lectures";
import { getUserWithLecturesById } from "@/api/lectures/access";
import { getProductById } from "@/api/products";
import { getTicketById } from "@/api/products/tickets";
import {
  EditLecture,
  EditProduct,
  EditTicket,
  EditUser,
} from "@/components/admin/grid/form";

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
    case "tickets":
      data = await getTicketById(id);
      break;
    case "users":
      data = await getUserWithLecturesById(id);
      break;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      {table === "lectures" && <EditLecture data={data} />}
      {table === "products" && <EditProduct data={data} />}
      {table === "tickets" && <EditTicket data={data} />}
      {table === "users" && <EditUser data={data} />}
    </>
  );
}
