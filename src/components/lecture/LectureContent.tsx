import { Typography } from "@mui/material";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const LectureContent: React.FC<any> = ({ markdown }) => {
  return (
    <Typography
      component={"section"}
      sx={{
        py: 1,
        alignSelf: "flex-start",
      }}
      letterSpacing={-0.4}
      fontSize={{ xs: 16, md: 17, xl: 18 }}
      lineHeight={{ xs: 1.4, sm: 1.45, md: 1.5 }}
    >
      <Markdown remarkPlugins={[remarkGfm]} className={"markdown"}>
        {markdown}
      </Markdown>
    </Typography>
  );
};

export default LectureContent;
