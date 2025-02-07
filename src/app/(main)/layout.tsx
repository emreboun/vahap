import styles from "./page.module.css";
import { AppBar } from "@/components/app-bar";
import { Footer } from "@/components/footer";
import { Box } from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppBar />

      <Box
        sx={{
          boxShadow: "1px 1px rgb(128,128,128,0.5)",
          position: "relative",
          zIndex: 1,
        }}
        className={styles.layout}
      >
        {children}
      </Box>

      <Footer />
    </>
  );
}
