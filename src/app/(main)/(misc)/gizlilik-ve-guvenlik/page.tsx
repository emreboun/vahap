import { Article } from "@/components/article";
import { GIZLILIK_VE_GUVENLIK } from "@/constants/misc";

export default function Page() {
  return (
    <>
      <Article {...GIZLILIK_VE_GUVENLIK} />
    </>
  );
}
