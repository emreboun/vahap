import { Metadata } from "next";
import { Article } from "@/components/article";
import { KVKK } from "@/constants/misc";

export const metadata: Metadata = {
  title: "KVKK - Online Satranç Okulu",
  description: "KVKK - Online Satranç Okulu - Vahap Şanal",
};

export default function Page() {
  return (
    <>
      <Article {...KVKK} />
    </>
  );
}
