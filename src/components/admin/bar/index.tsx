import { Box, Button, Paper, Typography } from "@mui/material";
import { AdminAccountMenu } from "./menu";
import { NavigationLink } from "@/components/app-bar/link";
import { cookies } from "next/headers";

interface BarProps {
  children?: React.ReactNode;
}

export const AdminBar: React.FC<BarProps> = async ({}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  return (
    <>
      <Paper
        style={{
          height: "56px",
          position: "relative",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 0,
        }}
        sx={{
          py: 0,
          pr: { xs: 1.5, sm: 2, md: 3 },
          pl: { xs: 2.5, sm: 2, md: 4 },
        }}
        elevation={2}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <NavigationLink
            href='/admin'
            style={{ display: "flex", alignItems: "center" }}
          >
            <Button
              sx={{
                textTransform: "none",
                border: "1px solid",
                borderColor: "rgb(255,255,255,0.0)",
                color: "secondary.main",
                "&:hover": {
                  color: "#fff",
                  border: "1px solid",
                  borderColor: "rgb(255,255,255,0.05)",
                },
              }}
            >
              <Typography
                variant='h6'
                fontWeight={500}
                fontSize={{ xs: 18, sm: 19, md: 20 }}
                fontFamily={"Helvetica"}
                //color='#fff'
                sx={{ opacity: 1 }}
              >
                {"Yönetim Paneli"}
              </Typography>
            </Button>
          </NavigationLink>
        </Box>

        {!!token && <AdminAccountMenu account={{}} />}
      </Paper>
    </>
  );
};
