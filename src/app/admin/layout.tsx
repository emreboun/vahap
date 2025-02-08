import { ThemeProvider } from "@/common/theme/provider";
import { AdminBar } from "@/components/admin/bar";
import { ModalProvider } from "@/components/modal/hooks";
import { Box } from "@mui/material";
import { Suspense } from "react";

export default function AdminLayout({ children }: any) {
  return (
    <>
      <ThemeProvider theme={"dark"} active={true}>
        <Box
          sx={{
            bgcolor: "secondary.main",
            flex: 1,
          }}
        >
          <>
            <Suspense>
              <ModalProvider>
                <AdminBar />

                {children}
              </ModalProvider>
            </Suspense>
          </>
        </Box>
      </ThemeProvider>
    </>
  );
}
