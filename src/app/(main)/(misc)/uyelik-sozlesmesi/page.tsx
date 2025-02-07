import { Article } from "@/components/article";
import { UYELIK_SOZLESMESI } from "@/constants/misc";
import { Typography } from "@mui/material";

export default function Page() {
  return (
    <>
      <Article {...UYELIK_SOZLESMESI} />
    </>
  );
}
