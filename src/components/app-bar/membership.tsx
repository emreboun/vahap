"use client";

import { Button, IconButton, Tooltip } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useState, useEffect } from "react";

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
          <Button
            sx={{
              textTransform: "none",
              paddingX: 2,
              ml: 1,
              bgcolor: "#fff",
            }}
            href={"/giris"}
            variant='outlined'
          >
            {"Giriş Yap"}
          </Button>

          {/* <Link href={"/kayit"} passHref> */}
          <Button
            sx={{
              textTransform: "none",
              paddingX: 2,
              marginX: 1,
            }}
            href={"/kayit"}
            variant={"contained"}
          >
            {"Kayıt Ol"}
          </Button>
          {/* </Link> */}
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
