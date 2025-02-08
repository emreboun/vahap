import React from "react";
import { Box } from "@mui/material";
import GridItem from "./GridItem";
import { LectureEntity } from "@/types";

const ResponsiveGrid: React.FC<{ items: LectureEntity[] }> = ({ items }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          md: "repeat(3,1fr)",
          sm: "repeat(2,1fr)",
          //sm: "repeat(,1fr)",
          xs: "repeat(1,1fr)",
        },
        gap: 4,
        px: { xs: 2, sm: 1, md: 0 },
      }}
    >
      {items.map((item, index) => (
        <Box key={index}>
          <GridItem
            imgUrl={item.videoThumbnail}
            title={item.title}
            href={`/egitimler/${item.slug}`}
          />
          {/* <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant='h6'>{item.title}</Typography>
          </Paper> */}
        </Box>
      ))}
    </Box>
  );
};

export default ResponsiveGrid;
