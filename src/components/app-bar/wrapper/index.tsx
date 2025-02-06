"use client";
import styles from "../appbar.module.css";
import React from "react";

import { AppBar as MuiAppBar } from "@mui/material";
import { useScrollHandler } from "@/hooks/scroll";

interface AppBarProps {
  children?: React.ReactNode;
}

export const AppBarWrapper: React.FC<AppBarProps> = ({ children }) => {
  const { direction } = useScrollHandler();

  return (
    <MuiAppBar
      elevation={0}
      className={`${styles.container}`}
      sx={{
        bgcolor: "background.paper",
        //bgcolor: "secondary.main",
        color: "text.primary",
        height: { xs: 64, md: 100 },
        top: {
          xs: direction === "up" || scrollY < 64 ? 0 : -64,
          md: direction === "up" || scrollY < 100 ? 0 : -100,
        },
        boxShadow: 1,
        //position: "relative",
      }}
      //style={{ position: ''}}
    >
      <>{children}</>
    </MuiAppBar>
  );
};
