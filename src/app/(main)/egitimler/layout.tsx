import { Box } from "@mui/material";

export default function LecturesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      className='responsive'
      sx={{
        // py: { xs: 2, sm: 8, md: 12 },
        whiteSpace: "break-spaces",
        fontFamily: "Lexend, sans-serif",
      }}
    >
      {children}
    </Box>
  );
}
