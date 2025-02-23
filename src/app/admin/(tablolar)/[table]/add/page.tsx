import {
  AddLecture,
  AddProduct,
  AddTicket,
} from "@/components/admin/grid/form";
import { Box, Paper } from "@mui/material";

export default async function AddEntityPage({ params }: { params: any }) {
  const { table } = await params;

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
          {table === "lectures" && <AddLecture />}
          {table === "products" && <AddProduct />}
          {table === "tickets" && <AddTicket />}
        </Box>
      </Paper>
    </>
  );
}
