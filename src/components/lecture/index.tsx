import { Paper, Box, Divider, Typography } from "@mui/material";

import VimeoVideo from "./VimeoVideo";
import AddToCartButton from "./AddToCartButton";
//import { Lecture } from "@prisma/client";

export interface LectureMainProps {
  data: any; //Lecture;
}
export const LectureMain: React.FC<LectureMainProps> = ({ data }) => {
  const {
    name,
    mainVideo = "https://vimeo.com/1054640893/75cd40a8e1?share=copy",
  } = data;
  const auth = true;
  const hasAccess = false;

  return (
    <>
      <Paper sx={{ px: 2, pt: 0, pb: 3, boxShadow: 2 }} elevation={0}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pt: 0.5,
            pr: 1,
            px: { xs: 1, md: 2 },
          }}
        >
          <Typography
            component='h1'
            sx={{
              fontFamily: "Lexend, sans-serif",
              fontSize: { xs: 17, sm: 20, md: 22 },
              fontWeight: 600,
              letterSpacing: { xs: -0.3, sm: -0.1, md: 0 },
              pl: { xs: 0, md: 1 },
              py: 2.5,
            }}
          >
            {name}
          </Typography>

          {!hasAccess && <AddToCartButton data={data} />}
        </Box>

        <Divider />

        <Box sx={{ pt: { xs: 1, md: 1.6, xl: 2 } }}>
          <VimeoVideo src={mainVideo} />
        </Box>

        <Box sx={{ px: { xs: 1.5, md: 2 } }}>
          <Typography
            sx={{
              whiteSpace: "break-spaces",
              fontFamily: "Lexend, sans-serif",
            }}
          >
            {data.description}
          </Typography>
        </Box>
      </Paper>
    </>
  );
};
