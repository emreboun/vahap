//import { AdminMain } from "@/components/admin/home";
//import { getCategories } from "../(home)/(search)/actions";

import { getAllPurchasesAdmin } from "@/api/user/purchase";
import { Box, Paper } from "@mui/material";

export default async function AdminPage() {
  const purchases = await getAllPurchasesAdmin();
  console.log(purchases);
  return (
    <>
      <Box
        sx={{
          flex: 1,
          bgcolor: "red",
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "stretch",
        }}
      >
        <Paper sx={{ flex: 1 }}> </Paper>
        <Box sx={{ flex: 1 }} />
      </Box>
    </>
  );
}
