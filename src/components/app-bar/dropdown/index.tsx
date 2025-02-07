"use client";
import styles from "./dropdown.module.css";

import { useState } from "react";
import { Box, Collapse } from "@mui/material";
import { NavigationBar } from "../navigation";
import { useScrollHandler } from "@/hooks/scroll";

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
      <button
        className={`${styles.btn} ${active ? styles.active : styles.inactive}`}
        onClick={handleDropdown}
        style={{
          zIndex: 2,
          opacity: 0.6,
        }}
      >
        <span />
        <span style={{ marginTop: 6 }} />
        <span style={{ marginTop: 6 }} />
      </button>

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
        <Collapse in={active} timeout='auto' unmountOnExit>
          <Box
            style={{
              paddingTop: 12,
              backgroundColor: "#fff",
              paddingBottom: 20,
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
