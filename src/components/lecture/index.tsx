import { Paper, Box, Divider, Typography } from "@mui/material";

import AddToCartButton from "./AddToCartButton";
import { VimeoVideoPlayer } from "./video/VimeoVideoPlayer";
//import { Suspense } from "react";
import { LectureMenu } from "./menu";

export interface LectureMainProps {
  slug: string;
  data: any; //Lecture;
  opts?: any;
}
export const LectureMain: React.FC<LectureMainProps> = ({
  slug,
  data,
  opts,
}) => {
  const { name, introVideo, mainVideo } = data;
  const { hasAccess } = opts;

  return (
    <>
      <Paper
        component='section'
        className='responsiveSmall'
        sx={{
          pt: 0,
          pb: 3,
          boxShadow: 1,
          borderRadius: { xs: 0, sm: 0.6 },
          borderLeft: { xs: 0, sm: "1px solid #e0e0e0" },
          borderRight: { xs: 0, sm: "1px solid #e0e0e0" },
          borderTop: "1px solid #e0e0e0",
          borderBottom: "1px solid #e0e0e0",
          bgcolor: "secondary.main", // "background.paper",
        }}
        elevation={0}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            px: { xs: 2, sm: 3, md: 4, lg: 5 },
          }}
        >
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

          <Divider sx={{ display: { xs: "none", sm: "block" } }} />

          <Box sx={{ pt: { xs: 0, sm: 1, md: 1.6, xl: 2 } }}>
            <>
              <VimeoVideoPlayer
                src={{
                  intro: introVideo,
                  main: mainVideo,
                }}
                slug={slug}
              />
            </>
            {/* <VimeoVideo src={{ intro: introVideo, main: mainVideo }} /> */}
          </Box>

          <Box
            sx={{
              px: { xs: 1.5, md: 2 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LectureMenu slug={slug} data={data} />
            <Typography
              sx={{
                whiteSpace: "break-spaces",
                fontFamily: "Lexend, sans-serif",
                textAlign: { xs: "justify", sm: "justify", md: "left" },
              }}
            >
              {data.description}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </>
  );
};
