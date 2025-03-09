"use client";

import {
  Badge,
  Box,
  Button,
  Collapse,
  darken,
  IconButton,
  Tooltip,
} from "@mui/material";
import { CircleRounded, ShoppingBagRounded } from "@mui/icons-material";
import Link from "next/link";
import { AccountMenu } from "./menu";
import { NavigationLink } from "./link";
import { useCart } from "../cart/CartProvider";
import { usePathname } from "next/navigation";
import useMenu from "./sidebars/useMenu";

interface MembershipProps {
  auth: boolean;
  enabled?: boolean;
}

export const Membership: React.FC<MembershipProps> = ({ auth }) => {
  const path = usePathname();
  const { onMenu } = useMenu();
  const { state } = useCart();
  const { items } = state;

  const isEmpty = items.length === 0;

  const handleCart = () => {
    onMenu("cart");
  };
  return (
    <>
      {!auth ? (
        <Box sx={{ display: "flex", width: 240, justifyContent: "flex-end" }}>
          <Collapse
            in={!isEmpty}
            orientation='horizontal'
            sx={{
              "& .MuiBadge-badge": {
                color: "#fff",
                translate: "-10px 0px",
              },
            }}
          >
            <Badge
              badgeContent={items.length}
              color='secondary'
              sx={{ cursor: "pointer" }}
            >
              <Button
                variant={"contained"}
                onClick={handleCart}
                sx={{
                  textTransform: "none",
                  paddingX: 2,
                  marginX: 1,
                  border: "1px solid",
                  transition: "all 0.2s linear",
                  borderColor: "primary.main",
                  maxHeight: 38.5,
                  minWidth: 103,
                  gap: 1,
                  "&:hover": {
                    color: "#fff",
                    bgcolor: darken("#D3B26B", 0.24),
                    borderColor: darken("#D3B26B", 0.08),
                    boxShadow: 4,
                  },
                }}
              >
                <ShoppingBagRounded
                  sx={{
                    fontSize: 20,
                    color: "#fff",
                    position: "relative",
                    zIndex: 2,
                  }}
                />
                <span>{"Sepetim"}</span>
              </Button>
            </Badge>
          </Collapse>
          <Link href={`/giris?redirect=${encodeURIComponent(path)}`} passHref>
            <Button
              variant='outlined'
              onClick={() => onMenu(null)}
              sx={{
                textTransform: "none",
                paddingX: 2,
                ml: 1,
                bgcolor: "#fff",
                border: "1px solid",
                borderColor: "primary.main",
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
          <Collapse in={isEmpty} orientation='horizontal'>
            <NavigationLink href={"/kayit"}>
              <Button
                className={"limitedLine"}
                variant={"contained"}
                onClick={() => onMenu(null)}
                sx={{
                  textTransform: "none",
                  paddingX: 2,
                  marginX: 1,
                  border: "1px solid",
                  borderColor: "primary.main",
                  maxHeight: 38.5,

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
          </Collapse>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              height: 58,
              display: "flex",
              justifyContent: "flex-end",
              //opacity: dropdown ? 1 : { xs: 0, md: 1 },
              transition: "all 0.2s linear",
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
                      "& .first-icon": { color: "primary.main" },
                      "& .second-icon": { color: "secondary.main" },
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
