import { Suspense } from "@/components/suspense";
import { Box } from "@mui/material";

interface TableLayoutProps {
  children?: React.ReactNode;
}

export default function TableLayout({ children }: TableLayoutProps) {
  return (
    <Box
      component='main'
      sx={{
        px: { xs: 1, sm: 2, md: 3 },
        pb: { xs: 1, sm: 2, md: 3 },
        pt: { xs: 1, sm: 1.5, md: 2 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "stretch",
        flex: 1,
        minHeight: "90dvh",
      }}
    >
      <Suspense>{children}</Suspense>
    </Box>
  );
}
