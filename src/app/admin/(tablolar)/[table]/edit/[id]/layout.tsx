import { Box, Paper } from "@mui/material";

export default async function EditEntityLayout({
  children,
}: {
  children: any;
}) {
  return (
    <>
      <Paper sx={{ position: "relative", flex: 1, overflow: "hidden" }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            overflowY: { xs: "auto", md: "none" },
          }}
        >
          {children}
        </Box>
      </Paper>
    </>
  );
}
