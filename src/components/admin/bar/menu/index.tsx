"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  AccountCircle as AccountIcon,
  LightModeRounded as LightThemeIcon,
  NightlightRoundSharp as DarkThemeIcon,
} from "@mui/icons-material";

import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem as MuiMenuItem,
  Tooltip,
} from "@mui/material";

import { logoutApi } from "@/app/admin/giris/actions";

interface AccountMenuProps {
  account: any;
  children?: React.ReactNode;
}

export const AdminAccountMenu: React.FC<AccountMenuProps> = ({ account }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      localStorage.clear();
      await logoutApi();
      location.reload();
    } catch (e: unknown) {
      console.error(e);
    }
  };

  return (
    <>
      <Box
        sx={{
          "& .MuiButtonBase-root": {
            mx: 0.5,
            aspectRatio: 1,
            height: "100%",
            color: "text.primary",
          },
          display: "flex",
          alignItems: "stretch",
          py: 0.4,
        }}
      >
        <Tooltip title={""}>
          <IconButton onClick={handleClick}>
            {!!account?.avatarUrl ? (
              <Image
                src={account?.avatarUrl}
                height={30}
                width={30}
                alt=''
                style={{
                  borderRadius: "50%",
                  border: "1px solid rgb(128,128,128,0.7)",
                }}
              />
            ) : (
              <AccountIcon color='secondary' />
            )}
          </IconButton>
        </Tooltip>

        {!!account && (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  minWidth: 200,
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  bgcolor: "background.paper",
                  borderRadius: 0.5,
                  //boxShadow: 2,
                  my: 0.7,
                  "& .MuiAvatar-root": {
                    width: 26,
                    height: 26,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 17,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                    textDecoration: "none",
                  },
                  "& .MuiList-root": {
                    padding: "1px",
                    borderRadius: 0.5,
                  },
                  "& .MuiMenuItem-root": {
                    borderRadius: 0,
                    margin: 0,
                    color: "text.primary",
                    opacity: 0.8,
                    textDecoration: "none",
                    "&:hover": {
                      opacity: 1,
                      color: "secondary.main",
                    },
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            disableScrollLock
          >
            <Link href={`/`} passHref>
              <MenuItem title={"Siteye git"} />
            </Link>

            <Divider style={{ margin: 0 }} />

            <Link href={`/admin/users`} passHref>
              <MenuItem title={"Kullanıcılar"} />
            </Link>

            <Link href={`/admin/products`} passHref>
              <MenuItem title={"Ürünler"} />
            </Link>

            <Divider style={{ margin: 0 }} />

            <Link href={`/admin/lectures`} passHref>
              <MenuItem title={"Eğitimler"} />
            </Link>

            <Link href={`/admin/tickets`} passHref>
              <MenuItem title={"Biletler"} />
            </Link>

            <Divider style={{ margin: 0 }} />

            <MenuItem title={"Çıkış"} onClick={handleLogout} />
          </Menu>
        )}
      </Box>
    </>
  );
};

interface MenuItemProps {
  title: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  children,
  onClick,
  ...props
}) => {
  return (
    <MuiMenuItem
      key={title}
      onClick={onClick}
      sx={{
        width: "100%",
        padding: "10px 16px",
        margin: 0,
        color: "text.primary",
        opacity: 0.8,
        textDecoration: "none",
      }}
      style={{ textDecoration: "none !important" }}
      {...props}
    >
      {children && <ListItemIcon>{children}</ListItemIcon>}
      {title}
    </MuiMenuItem>
  );
};
