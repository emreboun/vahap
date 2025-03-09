"use client";
import { Box, IconButton } from "@mui/material";
import { Close, Menu } from "@mui/icons-material";

import useMenu from "../sidebars/useMenu";

interface DropdownButtonProps {
  temp?: string;
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({}) => {
  const { menu, onMenu } = useMenu();
  return (
    <>
      <IconButton
        onClick={() => onMenu(menu === "mobile" ? null : "mobile")}
        sx={{
          color: menu === "mobile" ? "#fff" : "primary.main",
          height: "54px",
          aspectRatio: 1,
          zIndex: 3,
        }}
      >
        <Box
          sx={{
            bgcolor: menu === "mobile" ? "primary.main" : "transparent",
            borderRadius: "50%",
            aspectRatio: 1,
            display: "flex",
            alignItems: "center",
            p: 0.32,
            transition: "all 0.2s linear 0.05s",
          }}
        >
          <Close
            sx={{
              cursor: "pointer",
              transition: "all 0.3s linear",
              opacity: menu === "mobile" ? 1 : 0,
              position: "absolute",
              transform: menu === "mobile" ? "rotate(0deg)" : "rotate(180deg)",
            }}
          />

          <Menu
            sx={{
              cursor: "pointer",
              transition: "all 0.3s linear",
              opacity: menu === "mobile" ? 0 : 1,
              transform: menu !== "mobile" ? "rotate(0deg)" : "rotate(180deg)",
            }}
          />
        </Box>
      </IconButton>
    </>
  );
};
