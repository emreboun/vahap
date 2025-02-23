import { Article } from "@/components/article";
import { SATIS_SOZLESMESI } from "@/constants/misc";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Satış Sözleşmesi - Online Satranç Okulu",
  description: "Satış Sözleşmesi - Online Satranç Okulu - Vahap Şanal",
};
export default function Page() {
  return (
    <>
      <Article {...SATIS_SOZLESMESI} />
    </>
  );
}
