import styles from "./appbar.module.css";
import { Box, Toolbar } from "@mui/material";

import React from "react";
import { AppLogo } from "./logo";
import { NavigationBar } from "./navigation";
import { AppBarWrapper } from "./wrapper";
import { Dropdown } from "./dropdown";
import { Membership } from "./membership";
import { cookies } from "next/headers";

interface AppBarProps {
  user?: unknown;
}

export const AppBar: React.FC<AppBarProps> = async ({}) => {
  const cookieStore = await cookies();
  const auth = cookieStore.get("token");

  return (
    <>
      <AppBarWrapper>
        <Toolbar
          variant='dense'
          className={`${styles.toolbar} responsive`}
          sx={{
            justifyContent: { xs: "space-between" },
            gap: { md: "8px", lg: "64px", xl: "100px" },
          }}
        >
          <AppLogo />

          <Box sx={{ flex: 1, display: { xs: "none", md: "block" } }}>
            <NavigationBar />
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <Membership auth={!!auth} />
          </Box>
        </Toolbar>

        <Box sx={{ display: { xs: "block", md: "none" }, zIndex: 0 }}>
          <Dropdown>
            <Box
              sx={{
                px: 2,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Membership auth={!!auth} />
            </Box>
          </Dropdown>
        </Box>
      </AppBarWrapper>
    </>
  );
};
