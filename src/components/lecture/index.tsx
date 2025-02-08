import { LectureEntity } from "@/types";
import { Divider, Typography } from "@mui/material";
import Vimeo from "@u-wave/react-vimeo";

interface LectureMainProps {
  data: LectureEntity;
}
export const LectureMain: React.FC<LectureMainProps> = ({ data }) => {
  const { title } = data;
  return (
    <>
      <Typography
        component='h1'
        sx={{
          fontFamily: "Lexend, sans-serif",
          fontSize: 22,
          fontWeight: 600,
          mb: 2,
        }}
      >
        {title}
      </Typography>
      <Divider />
      {/*  <div style='padding:56.25% 0 0 0;position:relative;'>
        <iframe
          src='https://player.vimeo.com/video/1054640893?h=75cd40a8e1&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
          frameborder='0'
          allow='autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media'
          style='position:absolute;top:0;left:0;width:100%;height:100%;'
          title='Everybody dies alone, and something else'
        ></iframe>
      </div>
      <script src='https://player.vimeo.com/api/player.js'></script> */}
      {/* <Vimeo video={"x2to0hs"} autoplay /> */}
    </>
  );
};
