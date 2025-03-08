import { Paper } from "@mui/material";
import PaymentClient from "../../../components/payment/iyzico/PaymentClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ödeme Ekranı - Online Satranç Okulu",
  description: "Ödeme Ekranı- Online Satranç Okulu - Vahap Şanal",
};

export default async function PaymentPage() {
  return (
    <>
      <PaymentClient />
    </>
  );
}
