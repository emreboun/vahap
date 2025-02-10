"use client";
import { Box, IconButton } from "@mui/material";
import { Close, Menu } from "@mui/icons-material";

import { useSidebar } from "../sidebars/SidebarProvider";

interface DropdownButtonProps {
  temp?: string;
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({}) => {
  const { dropdown, handleDropdown } = useSidebar();

  return (
    <>
      <IconButton
        onClick={() => handleDropdown()}
        sx={{
          color: dropdown ? "#fff" : "primary.main",
          height: "54px",
          aspectRatio: 1,
          zIndex: 3,
        }}
      >
        <Box
          sx={{
            bgcolor: dropdown ? "primary.main" : "transparent",
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
              opacity: dropdown ? 1 : 0,
              position: "absolute",
              transform: dropdown ? "rotate(0deg)" : "rotate(180deg)",
            }}
          />

          <Menu
            sx={{
              cursor: "pointer",
              transition: "all 0.3s linear",
              opacity: dropdown ? 0 : 1,
              transform: !dropdown ? "rotate(0deg)" : "rotate(180deg)",
            }}
          />
        </Box>
      </IconButton>
    </>
  );
};
