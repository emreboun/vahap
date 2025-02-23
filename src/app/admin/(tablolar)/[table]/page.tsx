import { getAllLecturesAdmin } from "@/api/lectures";
import { getAllProducts, getAllProductsAdmin } from "@/api/products";
import { getAllTicketsAdmin } from "@/api/products/tickets";
import { getAllUsers } from "@/api/user/account";
import { Grid } from "@/components/admin/grid";

const TABLES = ["lectures", "products"];

export async function generateStaticParams() {
  return TABLES.map((table) => ({
    table: table,
  }));
}

export default async function TablePage({ params }: { params: any }) {
  const { table } = await params;

  let data: any[] = [];
  switch (table) {
    case "lectures":
      data = await getAllLecturesAdmin();
      break;
    case "products":
      data = await getAllProductsAdmin();
      break;
    case "users":
      data = await getAllUsers();
      break;

    case "tickets":
      data = await getAllTicketsAdmin();

      break;
    /*  case "cevaplar":
      data = await getAllCevaplar();
      break;
    case "sorular":
      data = await getAllSorular();
      break;
    case "kategoriler":
      data = await getAllKatlar();
      break;
    case "yonlendirmeler":
      data = await getAllRedirections();
      break;
    case "urunler":
      data = await getAllProducts();
      break; */
    /* default:
      data = []; */
  }
  return <Grid type={table} data={data} />;
}
