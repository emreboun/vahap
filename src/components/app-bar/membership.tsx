"use client";

import { Box, Button, darken, IconButton, Tooltip } from "@mui/material";
import { AccountCircle, ShoppingBagRounded } from "@mui/icons-material";
//import { useState, useEffect } from "react";
import Link from "next/link";
import { logoutApi } from "@/app/admin/giris/actions";
import { useRouter } from "next/navigation";

interface MembershipProps {
  auth: boolean;
  //onAccount?: () => void;
}

export const Membership: React.FC<MembershipProps> = ({ auth }) => {
  const router = useRouter();
  /* const authenticated = false; // useAppSelector((state) => state.account.authenticated);
  const [auth, setAuth] = useState(false); */

  /* useEffect(() => {
    const loadAuth = () => {
      setAuth(authenticated);
      //localStorage.getItem("account") ? setAuth(true) : setAuth(false);
    };
    loadAuth();
  }, [authenticated]); */

  const onLogout = async () => {
    await logoutApi();
    location.reload();
  };

  const onCart = () => {};

  return (
    <>
      {!auth ? (
        <>
          <Link href={"/giris"} passHref>
            <Button
              variant='outlined'
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

          <Link href={"/kayit"} passHref>
            <Button
              variant={"contained"}
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
          </Link>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              height: { xs: auth ? "46%" : "auto", md: "100%" },
              position: { xs: auth ? "absolute" : "", md: "relative" },
              top: { xs: auth ? -30 : "auto", md: "auto" },
              right: { xs: auth ? 72 : "auto", md: "auto" },
              opacity: { xs: auth ? 1 : 0, md: 1 },
              //transition: "opacity 0.2s ease-in-out 0.5s",
            }}
          >
            <Tooltip title={"Sepetim"}>
              <IconButton
                onClick={onCart}
                size='large'
                sx={{
                  my: 0,
                  ml: 0.4,
                  height: "100%",
                  "&:hover": {
                    "& .MuiBox-root": { bgcolor: "secondary.main" },
                    "& .MuiSvgIcon-root": { color: "primary.main" },
                  },
                  opacity: { xs: 1, md: 1 },
                }}
              >
                <Box
                  sx={{
                    height: "90%",
                    aspectRatio: 1,
                    bgcolor: "primary.main",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ShoppingBagRounded
                    sx={{
                      fontSize: 20,
                      color: "#fff",
                    }}
                  />
                </Box>
              </IconButton>
            </Tooltip>

            <Tooltip title={"Hesabım"}>
              <IconButton
                onClick={onLogout}
                size='large'
                sx={{
                  my: 0,
                  ml: 0.4,
                  "&:hover": {
                    "& .MuiSvgIcon-root": {
                      color: "secondary.main",
                    },
                    "& .MuiBox-root": {
                      bgcolor: "primary.main",
                      borderRadius: "50%",
                    },
                  },
                  position: "relative",
                  opacity: auth ? 1 : 0,
                }}
              >
                <Box
                  sx={{
                    height: "40%",
                    aspectRatio: 1,
                    bgcolor: "#fff", //"primary.main",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    zIndex: 0,
                  }}
                />
                <AccountCircle
                  sx={{
                    fontSize: 34,
                    color: "primary.main",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      )}
    </>
  );
};
