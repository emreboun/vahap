import { getPageBySlug } from "@/api/pages";
import { Divider, Paper, Typography } from "@mui/material";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function MiscPage({ params }: any) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) {
    return null;
  }

  const { title, content } = page;

  return (
    <>
      <Paper
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          py: 3,
          boxShadow: 2,
          fontFamily: "Montserrat, Lexend, sans-serif",
        }}
        elevation={0}
      >
        <Typography
          component='h1'
          sx={{
            fontFamily: "Montserrat, Lexend, sans-serif",
            fontSize: { xs: 20, sm: 21, md: 22 },
            fontWeight: 650,
            pl: { xs: 3.2, sm: 2.8, md: 2.4 },
            mb: 2,
          }}
        >
          {title}
        </Typography>

        <Divider />

        <Typography
          component={"section"}
          sx={{
            py: { xs: 1, sm: 1.5, md: 2 },
            px: { xs: 2, md: 3 },
            whiteSpace: "break-spaces",
            lineHeight: 1.35,
            //whiteSpace: "preline",
            "& ul": {
              whiteSpace: "collapse",
              pl: 0.5,
            },
            "& li": {
              my: 0.8,
              "& p": {},
            },
          }}
          letterSpacing={-0.4}
          fontSize={{ xs: 16, md: 17, xl: 18 }}
          lineHeight={{ xs: 1.4, sm: 1.45, md: 1.5 }}
          textAlign={"justify"}
        >
          <Markdown remarkPlugins={[remarkGfm]} className={"markdown"}>
            {content}
          </Markdown>
        </Typography>
      </Paper>
    </>
  );
}
