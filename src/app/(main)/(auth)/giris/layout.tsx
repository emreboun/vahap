import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Üye Girişi - Online Satranç Okulu",
  description: "Üye Girişi - Online Satranç Okulu - Vahap Şanal",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
