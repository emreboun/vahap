import { Article } from "@/components/article";
import { UYELIK_SOZLESMESI } from "@/constants/misc";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Üyelik Sözleşmesi - Online Satranç Okulu",
  description: "Üyelik Sözleşmesi - Online Satranç Okulu - Vahap Şanal",
};
export default function Page() {
  return (
    <>
      <Article {...UYELIK_SOZLESMESI} />
    </>
  );
}
