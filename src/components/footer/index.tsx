import styles from "./footer.module.css";
import React from "react";
import Image from "next/image";
import { Box, ButtonBase, Divider, Typography } from "@mui/material";
import { NavigationLink, NavLink } from "../app-bar/link";
import { Form } from "./form";
import { SECTIONS } from "./constants";

export const Footer: React.FC = () => {
  return (
    <Box
      component={"footer"}
      sx={{
        bgcolor: "secondary.main",
        marginBottom: 0,
        paddingTop: "112px",
        paddingBottom: "32px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        className={styles.gridContainer}
        sx={{
          display: "grid",
          justifyContent: "center",
          alignItems: "flex-start",
          gridTemplateColumns: {
            lg: "repeat(3,1fr)",
            md: "repeat(2,1fr)",
            sm: "repeat(2,1fr)",
            xs: "repeat(1,1fr)",
          },
          mx: { xs: 0, sm: 16, md: 10, lg: 24, xl: 32 },
          pb: { xs: 8, sm: 8, md: 16, lg: 8, xl: 0 },
          gap: { xs: "24px", sm: "32px", md: "40px", lg: "40px" },
          columnGap: { xs: "24px", sm: "64px", md: "128px", lg: "64px" },
        }}
      >
        <Box
          className={styles.widgetContainer}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: "16px", sm: "24px", md: "24px", lg: "24px" },
            marginRight: { xs: 0, sm: 0, md: 0, lg: 8.7, xl: 14 },
            alignItems: { xs: "flex-start" },
          }}
        >
          <NavigationLink
            href={"/"}
            title={"Anasayfa"}
            style={{ position: "relative" }}
          >
            <Image src={"/logo.png"} alt={"Anasayfa"} width={146} height={52} />
            <Image
              src={"/logo-trans.png"}
              alt={"Anasayfa"}
              width={146}
              height={52}
              style={{ position: "absolute" }}
            />
          </NavigationLink>
          <Form />
        </Box>

        {SECTIONS.map((section) => (
          <Box
            key={section.title}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              maxWidth: { sm: 600 },
            }}
          >
            <Typography
              component={"h3"}
              sx={{
                color: "#1d2746",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: 1.2,
                letterSpacing: "-0.6px",
                marginBottom: "16px",
                paddingLeft: "9.6px",
              }}
            >
              {section.title}
            </Typography>

            <Box
              component={"nav"}
              sx={{
                fontSize: "12px",
                display: "flex",
                flexDirection: "column",
                alignUtems: "flex-start",
                textAlign: "left",
              }}
            >
              {section.links.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  <ButtonBase
                    sx={{
                      p: "9.6px",
                      textAlign: "left",
                      justifyContent: "flex-start",
                      borderRadius: 1,
                      "&:hover": {
                        color: "#fff",
                        bgcolor: "primary.main",
                        fontWeight: 600,
                        boxShadow: 2,
                      },
                    }}
                  >
                    {link.title}
                  </ButtonBase>
                </NavLink>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      <div className={styles.bottomContainer}>
        <Divider className={styles.divider} flexItem />
        <p className={styles.footerText}>© 2025 Tüm hakları saklıdır.</p>
      </div>
    </Box>
  );
};
