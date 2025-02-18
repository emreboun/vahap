"use client";

import {
  AccountCircle,
  LogoutRounded,
  SettingsRounded,
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
import Link from "next/link";
import { useState } from "react";
import { logout } from "@/api/firebase";
import { logoutApi } from "@/app/admin/giris/actions";
//import { processPayment } from "@/api/izyco";
import { tempFunction } from "@/api/izyco/temp";
//import { init } from "@/api/izyco/init";

interface AccountMenuProps {
  children?: React.ReactNode;
}

export const AccountMenu: React.FC<AccountMenuProps> = ({}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    //const res = tempFunction();
    //console.log(res);
    try {
      localStorage.clear();
      await logout();
      await logoutApi();

      location.reload();
    } catch (e: unknown) {
      console.error(e);
    }
  };

  const temp = async () => {
    //init();
    //await processPayment();
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
        }}
      >
        <Tooltip title={"Hesabım"}>
          <IconButton
            onClick={handleClick}
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
              display: { xs: "none", md: "flex" },
            }}
          >
            <Box
              sx={{
                height: "40%",
                aspectRatio: 1,
                bgcolor: "#fff",
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
                fontSize: { xs: 34 },
                color: "primary.main",
                position: "relative",
                zIndex: 1,
              }}
            />
          </IconButton>
        </Tooltip>

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
                  right: 25,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                  textDecoration: "none",
                },
                "& .MuiList-root": {
                  padding: "4px 0px",
                },
                "& .MuiMenuItem-root": {
                  borderRadius: 0,
                  margin: 0,
                  color: "text.secondary",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#fff",
                    bgcolor: "secondary.main",
                    fontWeight: 600,
                  },
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          disableScrollLock
        >
          {/* <Link href={`/`} passHref> */}
          <MenuItem
            icon={<SettingsRounded sx={{ fontSize: 20 }} />}
            title={"Ayarlar"}
            onClick={temp}
          />
          {/* </Link> */}

          <Divider />

          <MenuItem
            icon={<LogoutRounded sx={{ fontSize: 22 }} />}
            title={"Çıkış"}
            onClick={handleLogout}
          />
        </Menu>
      </Box>
    </>
  );
};

interface MenuItemProps {
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  sx?: any;
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  icon,
  children,
  sx,
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
        //opacity: 0.8,
        textDecoration: "none",
        ...sx,
      }}
      style={{ textDecoration: "none !important" }}
      {...props}
    >
      {children && <ListItemIcon>{children}</ListItemIcon>}
      {icon && (
        <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>{icon}</Box>
      )}
      {title}
    </MuiMenuItem>
  );
};
