import React from "react";
import { Box } from "@mui/material";
import GridItem from "./GridItem";

interface LectureEntity {
  id: number;
  name: string;
  slug: string;
  description: string;
  files: { path: string }[];
  thumbnail?: string;
}

const ResponsiveGrid: React.FC<{ items: LectureEntity[]; slug: string }> = ({
  items,
  slug,
}) => {
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
            imgUrl={
              //item.files.length > 0 ? item.files[0].path : `/thumbnail_main.jpg`
              item.thumbnail ?? `/thumbnail_main.jpg`
            }
            title={item.name}
            href={`/${slug}/${item.slug}`}
            description={item.description}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ResponsiveGrid;
