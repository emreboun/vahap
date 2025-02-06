import styles from "./appbar.module.css";
import { Box, Button, Toolbar } from "@mui/material";

import React from "react";
import { AppLogo } from "./logo";
import { NavigationBar } from "./navigation";
import { NavigationLink } from "./link";
import { ShoppingCartRounded as CartIcon } from "@mui/icons-material";
import { AppBarWrapper } from "./wrapper";
import { Dropdown } from "./dropdown";
import { Membership } from "./membership";

interface AppBarProps {
  user?: unknown;
}

export const AppBar: React.FC<AppBarProps> = ({}) => {
  return (
    <>
      <AppBarWrapper>
        <Toolbar
          variant='dense'
          className={`${styles.toolbar} responsive`}
          sx={{
            justifyContent: { xs: "space-between" },
            gap: { md: "8px", lg: "64px", xl: "100px" },
            //alignItems: "center",
            //mr: { xs: "64px", sm: 0, xl: 8 },
            //ml: { xs: "32px", sm: 0.5, xl: 8 },
            // position: "relative",
            //borderBottom: "1px solid red",
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
            <NavigationLink
              href={"https:elektromarketim.com"}
              title={"Sepetim"}
              passHref
            >
              <Button
                variant='outlined'
                className={styles.mainButton}
                sx={{ "&:hover": { bgcolor: "primary.main" } }}
              >
                <CartIcon className={styles.cartIcon} />
                {"Sepetim"}
              </Button>
            </NavigationLink>

            <Membership />
          </Box>
        </Toolbar>

        <Box sx={{ display: { xs: "block", md: "none" }, zIndex: 0 }}>
          <Dropdown>
            <NavigationLink
              href={"https:elektromarketim.com"}
              title={"Sepetim"}
              passHref
            >
              <Button
                variant='outlined'
                className={styles.mainButton}
                style={{
                  marginLeft: 24,
                }}
              >
                <CartIcon className={styles.cartIcon} />
                {"Sepetim"}
              </Button>
            </NavigationLink>
          </Dropdown>
        </Box>
      </AppBarWrapper>
    </>
  );
};
