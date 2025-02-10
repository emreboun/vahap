import React from "react";
import { Box } from "@mui/material";
import GridItem from "./GridItem";
import { LectureEntity } from "@/types";
import { Lecture } from "@prisma/client";

const ResponsiveGrid: React.FC<{ items: Lecture[] }> = ({ items }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          md: "repeat(3,1fr)",
          sm: "repeat(2,1fr)",
          xs: "repeat(1,1fr)",
        },
        gap: 4,
        px: { xs: 2, sm: 1, md: 0 },
      }}
    >
      {items.map((item, index) => (
        <Box key={index}>
          <GridItem
            imgUrl={item.mainThumbnail}
            title={item.name}
            href={`/egitimler/${item.slug}`}
            description={item.description}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ResponsiveGrid;
