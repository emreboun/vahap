import { Paper } from "@mui/material";
import PaymentClient from "./PaymentClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ödeme Ekranı - Online Satranç Okulu",
  description: "Ödeme Ekranı- Online Satranç Okulu - Vahap Şanal",
};

export default async function PaymentPage() {
  return (
    <>
      <Paper
        sx={{ px: 4, py: 3, boxShadow: 2, minHeight: { xs: 320, md: 480 } }}
        elevation={0}
      >
        <PaymentClient />
      </Paper>
    </>
  );
}
