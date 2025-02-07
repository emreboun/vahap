"use client";

import { Button, darken, IconButton, Tooltip } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useState, useEffect } from "react";
import Link from "next/link";

interface MembershipProps {
  children?: React.ReactNode;
  onAccount?: () => void;
}

export const Membership: React.FC<MembershipProps> = ({
  children,
  onAccount,
}) => {
  const authenticated = false; // useAppSelector((state) => state.account.authenticated);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const loadAuth = () => {
      setAuth(authenticated);
      //localStorage.getItem("account") ? setAuth(true) : setAuth(false);
    };
    loadAuth();
  }, [authenticated]);

  const handleClick = () => {};

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
              //href={"/kayit"}
            >
              {"Kayıt Ol"}
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Tooltip title={"Hesap Ayarları"}>
            <IconButton
              onClick={onAccount}
              size='large'
              sx={{
                my: 0, //0.7,
                mr: -1.4,
                ml: 0.4,
              }}
            >
              <AccountCircle
                sx={{
                  fontSize: 34,
                }}
              />
            </IconButton>
          </Tooltip>
        </>
      )}
    </>
  );
};
