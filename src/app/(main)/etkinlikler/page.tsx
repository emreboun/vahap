import { getAllTickets } from "@/api/products";
import ProductGrid from "@/components/grid/ProductGrid";
import { Box, Paper, Typography } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Etkinlikler - Online Satranç Okulu",
  description: "Etkinlik Biletleri - Online Satranç Okulu - Vahap Şanal",
};

export const dynamic = "force-dynamic"; // Force dynamic rendering

export default async function TicketsPage() {
  const tickets: any[] = await getAllTickets();

  return (
    <Box className='responsive'>
      {tickets?.length > 0 ? (
        <ProductGrid items={tickets} />
      ) : (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            py: { xs: 8, md: 16, lg: 24, xl: 32 },
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='#888'
            width={80}
            viewBox='0 0 452 257'
            aria-hidden
            focusable='false'
          >
            <path
              className='no-rows-primary'
              d='M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z'
            />
            <path
              className='no-rows-primary'
              d='M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z'
            />
            <path
              className='no-rows-primary'
              d='M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z'
            />
            <path
              className='no-rows-secondary'
              d='M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z'
            />
          </svg>

          <Typography color={"textSecondary"} fontFamily={"Montserrat"}>
            {"Yakında etkinlik bulunmamaktadır."}
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
