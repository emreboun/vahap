import styles from "./page.module.css";
import { AppBar } from "@/components/app-bar";
import { Footer } from "@/components/footer";
import { Box } from "@mui/material";
import Providers from "../Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Providers>
        <AppBar />

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            mt: { xs: "64px", md: "100px" },
            py: { xs: 2, sm: 4, md: 8 },
          }}
          component={"main"}
        >
          {children}
        </Box>

        <Footer />
      </Providers>
    </>
  );
}
