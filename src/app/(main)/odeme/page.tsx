import PaymentClient from "../../../components/payment/iyzico/PaymentClient";

import type { Metadata } from "next";
import { Suspense } from "@/components/suspense";

export const metadata: Metadata = {
  title: "Ödeme Ekranı - Online Satranç Okulu",
  description: "Ödeme Ekranı- Online Satranç Okulu - Vahap Şanal",
};

export default async function PaymentPage() {
  return (
    <>
      <Suspense>
        <PaymentClient />
      </Suspense>
    </>
  );
}
