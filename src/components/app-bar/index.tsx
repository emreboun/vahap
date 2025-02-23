import { Box, Toolbar } from "@mui/material";

import React from "react";
import { AppLogo } from "./logo";
import { NavigationBar } from "./navigation";
import { AppBarWrapper } from "./wrapper";
import { Dropdown } from "./dropdown/Dropdown";
import { Membership } from "./membership";
import { cookies } from "next/headers";
import { DropdownButton } from "./dropdown/DropdownButton";

interface AppBarProps {
  user?: unknown;
}

export const AppBar: React.FC<AppBarProps> = async ({}) => {
  const cookieStore = await cookies();
  const auth = cookieStore.get("token");

  return (
    <>
      <AppBarWrapper auth={!!auth}>
        <Toolbar
          variant='dense'
          className={`responsive`}
          sx={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "space-between",
            gap: { md: "8px", lg: "64px", xl: "100px" },
            zIndex: 4,
          }}
        >
          <>
            <AppLogo />
          </>

          <Box
            sx={{ flex: 1, display: { xs: "none", md: "block" }, zIndex: 2 }}
          >
            <NavigationBar />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.1 }}>
            <Box
              sx={{
                display: { xs: !auth ? "none" : "flex", md: "flex" },
                alignItems: "center",
                zIndex: 2,
              }}
            >
              <Membership auth={!!auth} />
            </Box>

            <Box sx={{ display: { xs: "block", md: "none" }, zIndex: 1 }}>
              <DropdownButton />
              {/*  <Dropdown auth={!!auth} /> */}
            </Box>
          </Box>
        </Toolbar>

        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Dropdown auth={!!auth} />
        </Box>
      </AppBarWrapper>
    </>
  );
};
