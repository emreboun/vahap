"use client";
import styles from "./dropdown.module.css";

import { useState } from "react";
import { Box, ButtonBase, Collapse, IconButton, Paper } from "@mui/material";
import { NavigationBar } from "../navigation";
import { useScrollHandler } from "@/hooks/scroll";
import { Close, Menu } from "@mui/icons-material";

interface DropdownProps {
  children?: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  const { scrollY, direction } = useScrollHandler();

  const [active, setActive] = useState(false);
  const handleDropdown = () => {
    setActive(!active);
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleDropdown}
          sx={{
            color: active ? "#fff" : "primary.main",
            position: "absolute",
            height: "54px",
            aspectRatio: 1,
            zIndex: 3,
            right: 16,
            top: -28,
          }}
        >
          <Box
            sx={{
              bgcolor: active ? "primary.main" : "transparent",
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
                opacity: active ? 1 : 0,
                position: "absolute",
                transform: active ? "rotate(0deg)" : "rotate(180deg)",
              }}
              onClick={handleDropdown}
            />

            <Menu
              sx={{
                cursor: "pointer",
                transition: "all 0.3s linear",
                opacity: active ? 0 : 1,
                transform: !active ? "rotate(0deg)" : "rotate(180deg)",
              }}
              onClick={handleDropdown}
            />
          </Box>
        </IconButton>
        {/* <Box
          className={`${styles.btn} ${active ? styles.active : styles.inactive}`}
          onClick={handleDropdown}
          sx={{
            zIndex: 2,
            pt: 1,
            bgcolor: active ? "primary.main" : "transparent",

            "& .MuiBox-root": {
              bgcolor: active ? "#fff" : "#666",
              transition: "all 0.3s",
            },
          }}
          style={{
            transform: active
              ? "translate(-50%, -50%) scale(0.9)"
              : "translate(-50%, -50%)",
          }}
        >
          <Box component={"span"} style={{ zIndex: 1 }} />
          <Box component={"span"} style={{ marginTop: 6, zIndex: 1 }} />
          <Box component={"span"} style={{ marginTop: 6, zIndex: 1 }} />
        </Box> */}
        {/* <Close
          sx={{
            position: "absolute",
            zIndex: 3,
            top: -12,
            right: 20,
            color: active ? "#fff" : "transparent",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
          }}
          onClick={handleDropdown}
        /> */}
      </Box>

      <Box
        className={`${styles.dropdown} transition3`}
        style={{
          paddingTop: 16,
          backgroundColor: "#fff",
          top: direction === "up" || scrollY < 64 ? 32 : 48,
          opacity: active ? 1 : 0,
          transition:
            "top 0.3s ease-in-out, " +
            (active ? "opacity 0.1s" : "opacity 0.1s linear 0.2s"),
        }}
      >
        <Collapse in={active} timeout='auto' mountOnEnter unmountOnExit>
          <Box
            style={{
              paddingTop: 12,
              backgroundColor: "#fff",
              paddingBottom: 12,
            }}
          >
            <NavigationBar onClose={handleDropdown} />
            {children}
          </Box>
        </Collapse>
      </Box>

      {active && <span className={styles.overlay} onClick={handleDropdown} />}
    </>
  );
};
