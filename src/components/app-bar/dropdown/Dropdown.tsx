"use client";

import { Box, Button, Collapse, Typography } from "@mui/material";
import { NavigationBar } from "../navigation";
import { useScrollHandler } from "@/hooks/scroll";
import { Membership } from "../membership";
import { useSidebar } from "../sidebars/SidebarProvider";
import { logoutApi } from "@/app/admin/giris/actions";
import { logout } from "@/api/firebase";

interface DropdownProps {
  auth?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({ auth = false }) => {
  const { scrollY, direction } = useScrollHandler();
  const { dropdown, handleDropdown } = useSidebar();

  const handleLogout = async () => {
    try {
      localStorage.clear();
      await logout();
      await logoutApi();

      location.reload();
    } catch (e: unknown) {
      console.error(e);
    }
  };
  return (
    <>
      <Box
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          width: "100%",
          zIndex: 2,
          paddingTop: 16,
          backgroundColor: "#fff",
          top: direction === "up" || scrollY < 64 ? 32 : 48,
          opacity: dropdown ? 1 : 0,
          transition:
            "top 0.3s ease-in-out, " +
            (dropdown ? "opacity 0.1s" : "opacity 0.1s linear 0.2s"),
        }}
      >
        <Collapse in={dropdown} timeout='auto' mountOnEnter unmountOnExit>
          <Box
            style={{
              paddingTop: 12,
              backgroundColor: "#fff",
              paddingBottom: 12,
            }}
          >
            <Box sx={{ pt: 0.8, pl: { xs: 0.4, md: 0 } }}>
              <NavigationBar />
            </Box>
            <Box sx={{}}>
              {!auth ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    pr: 2.4,
                    pb: 1.2,
                  }}
                >
                  <Membership auth={!!auth} />
                </Box>
              ) : (
                <Box sx={{ pl: { xs: 0.6, md: 0 } }}>
                  <NavigationBar
                    links={[{ title: "Hesabım", href: "/hesabim" }]}
                  />

                  <Button
                    onClick={handleLogout}
                    sx={{
                      color: "#6b707f",
                      fontWeight: 500,
                      textTransform: "none",
                      textWrap: "nowrap",
                      flex: 1,
                      width: "100%",
                      "&:hover": {
                        color: "secondary.main",
                      },
                    }}
                  >
                    <Typography
                      component={"h2"}
                      sx={{
                        height: "100%",
                        width: "100%",
                        textAlign: "center",
                        textTransform: "none",
                        display: "flex",
                        alignItems: "center",
                        fontSize: 14,
                        letterSpacing: -0.2,
                        fontWeight: 600,
                        lineHeight: 1.9,
                        filter: "contrast(0.8)",
                        justifyContent: { xs: "flex-start", md: "center" },
                        pl: { xs: 3, md: 0 },
                      }}
                    >
                      {"Çıkış Yap"}
                    </Typography>
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Collapse>
      </Box>

      {dropdown && (
        <Box
          component={"span"}
          sx={{
            position: "fixed",
            top: "64px",
            right: 0,
            bottom: "-64px",
            left: 0,
            zIndex: 0,
            bgcolor: "rgba(0, 0, 0, 0.25)",
          }}
          onClick={() => handleDropdown()}
        />
      )}
    </>
  );
};
