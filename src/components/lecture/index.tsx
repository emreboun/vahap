import { Paper, Box, Divider, Typography } from "@mui/material";

import AddToCartButton from "./AddToCartButton";
import VideoPlayer from "./video/VideoPlayer";
import LectureContent from "./LectureContent";

export interface LectureMainProps {
  data: any;
  hasAccess?: boolean;
}
export const LectureMain: React.FC<LectureMainProps> = ({
  data,
  hasAccess = false,
}) => {
  const { name, introVideo, mainVideo, duration, resources } = data;

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
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pt: { xs: 0.2, sm: 0.5 },
              pr: { xs: 2.4, sm: 4, md: 5, lg: 6 },
              pl: { xs: 3, md: 5 },
              pb: {
                xs: hasAccess
                  ? 0.2
                  : name.length > 48
                    ? 4.8
                    : name.length > 32
                      ? 6.4
                      : 0.2,
                sm: 0,
              },
            }}
          >
            <Typography
              component='h1'
              sx={{
                fontFamily:
                  "Montserrat, Playfair Display, Montserrat, Lexend, sans-serif",
                fontSize: { xs: 17, sm: 20, md: 22 },
                fontWeight: 600,
                letterSpacing: { xs: -0.9, sm: -0.4, md: -0.3 },
                pl: { xs: 0, md: 1 },
                pt: { xs: 2, sm: 2.5 },
                pb: { xs: 2, sm: 2.5 },
              }}
            >
              {name}
            </Typography>

            {!hasAccess && (
              <Box
                sx={{
                  position: {
                    xs: name.length > 32 ? "absolute" : "relative",
                    sm: "relative",
                  },
                  bottom: { xs: name.length > 32 ? 5 : 0, sm: 0 },
                  right: { xs: name.length > 32 ? 10 : -8, sm: 0 },
                }}
              >
                <AddToCartButton data={data} />
              </Box>
            )}
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
              resources={resources}
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
            <LectureContent markdown={data.description} />
          </Box>
        </Box>
      </Paper>
    </>
  );
};
