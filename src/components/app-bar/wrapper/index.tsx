"use client";
import React from "react";

import { AppBar as MuiAppBar } from "@mui/material";
import { useScrollHandler } from "@/hooks/scroll";
import { CartSidebar } from "@/components/cart";
import { Sidebars } from "../sidebars";
import { Suspense } from "@/components/suspense";

interface AppBarProps {
  children?: React.ReactNode;
  auth?: boolean;
}

export const AppBarWrapper: React.FC<AppBarProps> = ({
  children,
  auth = false,
}) => {
  const { direction } = useScrollHandler();
  return (
    <>
      <MuiAppBar
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "stretch",
          gap: { md: "8px", lg: "64px", xl: "100px" },
          width: "100%",
          transition: "all 0.2s ease-in-out",
          position: "fixed",
          bgcolor: "background.paper",
          color: "text.primary",
          height: { xs: 64, md: 100 },
          top: {
            xs: direction === "up" || scrollY < 64 ? 0 : -64,
            md: direction === "up" || scrollY < 100 ? 0 : -100,
          },
          boxShadow: 1,
        }}
      >
        <>{children}</>
      </MuiAppBar>

      <Suspense>
        <Sidebars
          direction={direction}
          list={[
            {
              value: "cart",
              child: <CartSidebar auth={auth} />,
            },
          ]}
        />
      </Suspense>
    </>
  );
};
