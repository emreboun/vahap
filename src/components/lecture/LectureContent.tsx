import { Typography } from "@mui/material";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const LectureContent: React.FC<any> = ({ markdown }) => {
  return (
    <Typography
      component={"section"}
      sx={{ letterSpacing: -0.4, py: 1 }}
      className={"markdown-container"}
    >
      <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
    </Typography>
  );
};

export default LectureContent;
