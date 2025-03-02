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

const ResponsiveGrid: React.FC<{
  items: LectureEntity[];
  slug: string;
  gap?: number | object;
}> = ({ items, slug, gap = { xs: 3, sm: 3.2, md: 3.6, lg: 3, xl: 5 } }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          lg: "repeat(3,1fr)",
          md: "repeat(2,1fr)",
          sm: "repeat(2,1fr)",
          xs: "repeat(1,1fr)",
        },
        gap,
        px: { xs: 2, sm: 0, md: 2, lg: 0 },
      }}
    >
      {items.map((item, index) => (
        <Box key={index}>
          <GridItem item={{ ...item, href: `/${slug}/${item.slug}` }} />
        </Box>
      ))}
    </Box>
  );
};

export default ResponsiveGrid;
