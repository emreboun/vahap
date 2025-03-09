"use client";
import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "../link";
import { NAV_LINKS, NavLinkProps } from "../constants";
import useMenu from "../sidebars/useMenu";

type NavigationBarProps = {
  links?: NavLinkProps[];
  style?: React.CSSProperties;
};

export const NavigationBar: React.FC<NavigationBarProps> = ({
  style,
  links = NAV_LINKS,
}) => {
  const { onMenu } = useMenu();
  const closeDropdown = () => {
    onMenu(null);
  };

  return (
    <Box
      component={"nav"}
      sx={{
        flex: 1,
        display: "flex",
        height: "100%",
        //pb: { xs: 1, md: 0 },
        //pl: { xs: 0.6, md: 0 },
        flexDirection: { xs: "column", md: "row" },
        alignItems: "stretch",
        "& .MuiButton-root": {
          color: "#6b707f",
          fontWeight: 500,
          textTransform: "none",
          textWrap: "nowrap",
          flex: 1,
          "&:hover": {
            color: "secondary.main",
          },
        },
      }}
      style={style}
    >
      {links.map((page) => (
        <NavLink key={page.href} href={`${page.href}`} external={page.external}>
          {!page.external ? (
            <Button onClick={closeDropdown}>
              <Typography
                component={"h2"}
                sx={{
                  height: "100%",
                  width: "100%",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  fontSize: 14,
                  fontFamily: "Helvetica, Roboto, sans-serif",
                  letterSpacing: -0.2,
                  fontWeight: 600,
                  lineHeight: 1.9,
                  filter: "contrast(0.8)",
                  justifyContent: { xs: "flex-start", md: "center" },
                  pl: { xs: 3, md: 0 },
                }}
              >
                {page.title}
              </Typography>
            </Button>
          ) : (
            <Button
              href={page.href}
              target='_blank'
              rel='noopener noreferrer'
              onClick={closeDropdown}
            >
              <Typography
                component={"h2"}
                sx={{
                  height: "100%",
                  width: "100%",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  fontSize: 14,
                  letterSpacing: -0.2,
                  fontWeight: 600,
                  lineHeight: 1.9,
                  filter: "contrast(0.8)",
                  justifyContent: { xs: "flex-start", md: "center" },
                  pl: { xs: 3, md: 0 },
                  fontFamily: "Montserrat, Helvetica, sans-serif",
                }}
              >
                <>{page.title}</>
              </Typography>
            </Button>
          )}
        </NavLink>
      ))}
    </Box>
  );
};
