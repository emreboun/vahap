import React from "react";
import { Box, Typography } from "@mui/material";

export const BoxCard: React.FC<{
  children: React.ReactNode;
  title: string;
  sx?: any;
}> = ({ children, title, sx }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          rowGap: "2px",
          columnGap: "4px",
          borderRadius: "4px",
          border: "1px solid rgb(255, 255, 255, 0.25)",
          position: "relative",
          py: 2,
          px: 1.5,
          zIndex: 0,
          ...sx,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 10,
            top: -10,
            fontSize: 13,
          }}
        >
          <Typography
            sx={{
              zIndex: 2,
              position: "relative",
              fontSize: 13,
              opacity: 0.9,
              px: 0.4,
            }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              position: "absolute",
              left: -1,
              top: "46%",
              bottom: "46%",
              right: -1,
              bgcolor: "background.paper",
              zIndex: 1,
            }}
          />
        </Box>

        {children}
      </Box>
    </>
  );
};
