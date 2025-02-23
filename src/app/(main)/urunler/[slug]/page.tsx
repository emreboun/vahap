import { getProductBySlug } from "@/api/products";
import { parseUrlSlug } from "@/components/admin/utils";
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

export default async function ProductPage({
  params,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  //const { query } = await searchParams;
  //console.log(query);
  const productSlug = decodeURIComponent(slug);

  const product = await getProductBySlug(productSlug);

  if (!product) {
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
        {"Ürün bulunamadı"}
      </Typography>
    );
  }

  return <>asd</>;
}
