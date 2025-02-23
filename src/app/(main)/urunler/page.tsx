import { getAllProducts } from "@/api/products";
import ResponsiveGrid from "@/components/grid";
import { Box } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ürünler - Online Satranç Okulu",
  description: "Tüm Ürünler - Online Satranç Okulu - Vahap Şanal",
};

export const dynamic = "force-dynamic"; // Force dynamic rendering

export default async function ProductsPage() {
  const products: any[] = await getAllProducts();

  return (
    <Box className='responsive'>
      <ResponsiveGrid items={products} slug={"urunler"} />
    </Box>
  );
}
