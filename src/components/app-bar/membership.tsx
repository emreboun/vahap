"use client";

import { Badge, Box, Button, darken, IconButton, Tooltip } from "@mui/material";
import { CircleRounded, ShoppingBagRounded } from "@mui/icons-material";
//import { useState, useEffect } from "react";
import Link from "next/link";
import { AccountMenu } from "./menu";
import { NavigationLink } from "./link";
import { useSidebar } from "./sidebars/SidebarProvider";
import { useCart } from "../cart/CartProvider";

interface MembershipProps {
  auth: boolean;
  enabled?: boolean;
}

export const Membership: React.FC<MembershipProps> = ({
  auth,
  //enabled = true,
}) => {
  const { onSidebar, handleDropdown, dropdown } = useSidebar();
  const { state } = useCart();
  const { items } = state;

  const handleCart = () => {
    onSidebar("cart");
  };

  return (
    <>
      {!auth ? (
        <>
          <Link href={"/giris"} passHref>
            <Button
              variant='outlined'
              onClick={() => handleDropdown(false)}
              sx={{
                textTransform: "none",
                paddingX: 2,
                ml: 1,
                bgcolor: "#fff",
                border: "1px solid",
                borderColor: "primary.main",
                transition: "all 0.2s linear",
                "&:hover": {
                  color: "#fff",
                  bgcolor: darken("#D3B26B", 0.24),
                  borderColor: darken("#D3B26B", 0.08),
                  boxShadow: 4,
                },
              }}
            >
              {"Giriş Yap"}
            </Button>
          </Link>

          <NavigationLink href={"/kayit"}>
            <Button
              variant={"contained"}
              onClick={() => handleDropdown(false)}
              sx={{
                textTransform: "none",
                paddingX: 2,
                marginX: 1,
                border: "1px solid",
                transition: "all 0.2s linear",
                borderColor: "primary.main",
                "&:hover": {
                  color: "#fff",
                  bgcolor: darken("#D3B26B", 0.24),
                  borderColor: darken("#D3B26B", 0.08),
                  boxShadow: 4,
                },
              }}
            >
              {"Kayıt Ol"}
            </Button>
          </NavigationLink>
        </>
      ) : (
        <>
          <Box
            sx={{
              height: 58,
              display: "flex",
              justifyContent: "flex-end",
              //opacity: dropdown ? 1 : { xs: 0, md: 1 },
              transition: "all 0.24s ease-in-out",
              "& .MuiBadge-badge": {
                color: "#fff",
                translate: "-12px 12px",
              },
            }}
          >
            <Tooltip title={"Sepetim"}>
              <Badge
                badgeContent={items.length}
                color='secondary'
                sx={{ cursor: "pointer" }}
              >
                <IconButton
                  onClick={handleCart}
                  size='large'
                  sx={{
                    my: 0,
                    height: "100%",
                    "&:hover": {
                      "& .first-icon": { color: "primary.main" }, // ShoppingBagRounded
                      "& .second-icon": { color: "secondary.main" }, // CircleRounded
                    },
                    aspectRatio: 1,
                  }}
                >
                  <ShoppingBagRounded
                    className='first-icon'
                    sx={{
                      fontSize: 20,
                      color: "#fff",
                      position: "relative",
                      zIndex: 2,
                    }}
                  />

                  <CircleRounded
                    className='second-icon'
                    sx={{
                      position: "absolute",
                      fontSize: 38,
                      zIndex: 1,
                      color: "primary.main",
                    }}
                  />
                </IconButton>
              </Badge>
            </Tooltip>

            <AccountMenu />
          </Box>
        </>
      )}
    </>
  );
};
