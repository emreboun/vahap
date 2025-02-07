import { Article } from "@/components/article";
import { SATIS_SOZLESMESI } from "@/constants/misc";

export default function Page() {
  return (
    <>
      <Article {...SATIS_SOZLESMESI} />
    </>
  );
}
