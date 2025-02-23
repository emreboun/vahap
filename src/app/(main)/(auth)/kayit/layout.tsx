import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Üye Kayıt - Online Satranç Okulu",
  description: "Üye Kayıt - Online Satranç Okulu - Vahap Şanal",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
