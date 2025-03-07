import React from "react";
import Image from "next/image";
import { Box, ButtonBase, Divider, Typography } from "@mui/material";
import { NavigationLink, NavLink } from "../app-bar/link";
import { Form } from "./form";
import { SECTIONS } from "./constants";
import { CartButton } from "./CartButton";

export const Footer: React.FC = () => {
  return (
    <Box
      component={"footer"}
      sx={{
        //bgcolor: "secondary.main",
        bgcolor: "#445055",
        marginBottom: 0,
        paddingTop: "112px",
        paddingBottom: "32px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderTop: "1px solid #243035",
        //borderTop: "1px solid #B3925B",
      }}
    >
      <Box
        //className={styles.gridContainer}
        sx={{
          display: "grid",
          justifyContent: "center",
          alignItems: "flex-start",
          gridTemplateColumns: {
            lg: "repeat(4,1fr)",
            md: "repeat(2,1fr)",
            sm: "repeat(2,1fr)",
            xs: "repeat(1,1fr)",
          },
          mx: { xs: 0, sm: 12, md: 10, lg: 24, xl: 32 },
          pb: { xs: 8, sm: 8, md: 16, lg: 8, xl: 0 },
          ml: { xs: -4, sm: 0 },
          rowGap: { xs: "32px", sm: "64px", md: "48px", lg: "40px" },
          columnGap: { xs: "24px", sm: "80px", md: "128px", lg: "40px" },
        }}
      >
        <Box
          //className={styles.widgetContainer}
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
                //color: "#1d2746",
                color: "secondary.main",
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
              {section.links.map((link) =>
                link.href ? (
                  <NavLink key={link.href} href={link.href}>
                    <ButtonBase
                      sx={{
                        p: "9.6px",
                        textAlign: "left",
                        justifyContent: "flex-start",
                        borderRadius: 1,
                        color: "secondary.main",
                        "&:hover": {
                          color: "#fff",
                          bgcolor: "secondary.main", //"primary.main",
                          fontWeight: 600,
                          boxShadow: 2,
                        },
                      }}
                    >
                      {link.title}
                    </ButtonBase>
                  </NavLink>
                ) : (
                  <CartButton key={link.title} />
                )
              )}
            </Box>
          </Box>
        ))}
      </Box>

      <>
        <Divider
          sx={{
            borderColor: "#fff",
            mt: { xs: 4, sm: 6, md: 8, lg: 12 },
            mb: { xs: 0.4, sm: 0.5, md: 0.6 },
            mx: { xs: 4, sm: 6, md: 8, lg: 10, xl: 12 },
          }}
          flexItem
        />

        <Typography
          sx={{
            fontSize: 11,
            textAlign: "center",
            mb: "16px",
            zIndex: 2,
            //width: { xs: "60%", sm: "auto" },
            alignSelf: "center",
          }}
          color={"secondary"}
        >
          {"© 2025 Tüm hakları saklıdır."}
        </Typography>
      </>
    </Box>
  );
};
