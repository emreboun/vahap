import { Paper, Box, Divider, Typography } from "@mui/material";

import AddToCartButton from "./AddToCartButton";
import { VimeoVideoPlayer } from "./__video/VimeoVideoPlayer";
import VideoPlayer from "./video/VideoPlayer";
import LectureContent from "./LectureContent";

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
  const { name, introVideo, mainVideo, duration, misc } = data;
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
        }}
        elevation={0}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pt: 0.5,
              pr: { xs: 3, sm: 4, md: 5, lg: 6 },
              pl: { xs: 3, md: 5 },
            }}
          >
            <Typography
              component='h1'
              sx={{
                fontFamily:
                  "Montserrat, Playfair Display, Montserrat, Lexend, sans-serif",
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

          <Divider sx={{ display: { xs: "none", sm: "block" }, mx: 4 }} />

          <Box
            sx={{
              pt: { xs: 0, sm: 1, md: 1.6, xl: 2 },
            }}
          >
            <VideoPlayer
              intro={introVideo}
              main={hasAccess ? mainVideo : null}
              duration={duration}
              misc={misc}
            />
          </Box>

          <Box
            sx={{
              px: { xs: 3.5, sm: 4.5, md: 6, lg: 7 },
              pt: 2,
              pb: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            {/* <Typography
              sx={{
                whiteSpace: "break-spaces",
                //fontFamily: "Montserrat, Lexend, sans-serif",
                //fontFamily: "serif, sans-serif",
                //fontSize: { xs: 16, sm: 17, md: 18 },
                textAlign: { xs: "justify", sm: "justify", md: "left" },
              }}
              fontSize={16}
              fontFamily={"Helvetica"}
            >
              {data.description}
            </Typography> */}

            <LectureContent markdown={data.description} />
          </Box>
        </Box>
      </Paper>
    </>
  );
};
