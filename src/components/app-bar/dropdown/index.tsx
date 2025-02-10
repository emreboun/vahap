"use client";

import { Box, Collapse, IconButton } from "@mui/material";
import { NavigationBar } from "../navigation";
import { useScrollHandler } from "@/hooks/scroll";
import { Close, Menu } from "@mui/icons-material";
import { Membership } from "../membership";
import { useSidebar } from "../sidebars/SidebarProvider";

interface DropdownProps {
  auth?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({ auth = false }) => {
  const { scrollY, direction } = useScrollHandler();
  const { dropdown, handleDropdown } = useSidebar();

  return (
    <>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => handleDropdown()}
          sx={{
            color: dropdown ? "#fff" : "primary.main",
            height: "54px",
            aspectRatio: 1,
            zIndex: 3,
            mr: 2,
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
      </Box>

      <Box
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          width: "100%",
          zIndex: 2,
          paddingTop: 16,
          backgroundColor: "#fff",
          top: direction === "up" || scrollY < 64 ? 32 : 48,
          opacity: dropdown ? 1 : 0,
          transition:
            "top 0.3s ease-in-out, " +
            (dropdown ? "opacity 0.1s" : "opacity 0.1s linear 0.2s"),
        }}
        sx={{}}
      >
        <Collapse in={dropdown} timeout='auto' mountOnEnter unmountOnExit>
          <Box
            style={{
              paddingTop: 12,
              backgroundColor: "#fff",
              paddingBottom: 12,
            }}
          >
            <NavigationBar />
            <Box
              sx={{
                px: 2,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Membership auth={!!auth} />
            </Box>
          </Box>
        </Collapse>
      </Box>

      {dropdown && (
        <Box
          component={"span"}
          sx={{
            position: "fixed",
            top: "64px",
            right: 0,
            bottom: "-64px",
            left: 0,
            zIndex: 0,
            bgcolor: "rgba(0, 0, 0, 0.25)",
          }}
          onClick={() => handleDropdown()}
        />
      )}
    </>
  );
};
