"use client";

import { Box, Collapse, IconButton } from "@mui/material";
import { NavigationBar } from "../navigation";
import { useScrollHandler } from "@/hooks/scroll";
import { Close, Menu } from "@mui/icons-material";
import { Membership } from "../membership";
import useMenu from "../sidebars/useMenu";

interface DropdownProps {
  auth?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({ auth = false }) => {
  const { scrollY, direction } = useScrollHandler();
  const { menu, onMenu } = useMenu();

  return (
    <>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => onMenu(null)}
          sx={{
            color: menu === "mobile" ? "#fff" : "primary.main",
            height: "54px",
            aspectRatio: 1,
            zIndex: 3,
            mr: 2,
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
                transform:
                  menu === "mobile" ? "rotate(0deg)" : "rotate(180deg)",
              }}
            />

            <Menu
              sx={{
                cursor: "pointer",
                transition: "all 0.3s linear",
                opacity: menu === "mobile" ? 0 : 1,
                transform:
                  menu !== "mobile" ? "rotate(0deg)" : "rotate(180deg)",
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
          opacity: menu === "mobile" ? 1 : 0,
          transition:
            "top 0.3s ease-in-out, " +
            (menu === "mobile" ? "opacity 0.1s" : "opacity 0.1s linear 0.2s"),
        }}
        sx={{}}
      >
        <Collapse
          in={menu === "mobile"}
          timeout='auto'
          mountOnEnter
          unmountOnExit
        >
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

      {menu === "mobile" && (
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
          onClick={() => onMenu(null)}
        />
      )}
    </>
  );
};
