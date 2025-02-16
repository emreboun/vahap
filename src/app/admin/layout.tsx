import { ThemeProvider } from "@/common/theme/provider";
import { AdminBar } from "@/components/admin/bar";
import { ModalProvider } from "@/components/modal/hooks";
import { Suspense } from "@/components/suspense";
import { Box } from "@mui/material";

export default function AdminLayout({ children }: any) {
  return (
    <>
      <ThemeProvider theme={"dark"} active={true}>
        <Suspense>
          <ModalProvider>
            <Box
              sx={{
                bgcolor: "secondary.main",
                flex: 1,
              }}
            >
              <AdminBar />
              {children}
            </Box>
          </ModalProvider>
        </Suspense>
      </ThemeProvider>
    </>
  );
}
