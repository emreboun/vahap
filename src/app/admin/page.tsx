//import { AdminMain } from "@/components/admin/home";
//import { getCategories } from "../(home)/(search)/actions";

import { getAllPurchasesAdmin } from "@/api/user/purchase";
import EditButton from "@/components/admin/grid/form/EditButton";
import PurchaseItem from "@/components/admin/home/PurchaseItem";
import { NavLink } from "@/components/app-bar/link";
import { Box, List, ListItem, Paper, Typography } from "@mui/material";

export default async function AdminPage() {
  const purchases = await getAllPurchasesAdmin();
  return (
    <>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          //alignItems: "stretch",
          //justifyContent: "stretch",
          p: 1,
          gap: 1,
        }}
      >
        <Paper
          sx={{
            flex: { xs: 0, md: 1 },
            display: "flex",
            flexDirection: "column",
          }}
          elevation={0}
        >
          <Paper
            sx={{
              px: 2,
              py: 1.5,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <Typography>{"Sayfalar"}</Typography>
          </Paper>

          <List sx={{ p: 0 }}>
            <ListItem
              sx={{ borderBottom: "1px solid rgb(128,128,128,0.15)", gap: 1.5 }}
            >
              <Typography>{"Hakkımda"}</Typography>

              <NavLink href={`/admin/pages/hakkimda`}>
                <EditButton />
              </NavLink>
            </ListItem>

            <ListItem
              sx={{ borderBottom: "1px solid rgb(128,128,128,0.15)", gap: 1.5 }}
            >
              <Typography>{"İletişim"}</Typography>

              <NavLink href={`/admin/pages/iletisim`}>
                <EditButton />
              </NavLink>
            </ListItem>

            <ListItem
              sx={{ borderBottom: "1px solid rgb(128,128,128,0.15)", gap: 1.5 }}
            >
              <Typography>{"Sıkça Sorulan Sorular"}</Typography>

              <NavLink href={`/admin/pages/sss`}>
                <EditButton />
              </NavLink>
            </ListItem>
          </List>
        </Paper>

        <Paper
          sx={{
            flex: 1, //{ xs: 0, md: 1 },
            display: "flex",
            flexDirection: "column",
          }}
          elevation={0}
        >
          <Paper
            sx={{
              px: 2,
              py: 1.5,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <Typography>{"Son Satışlar"}</Typography>
          </Paper>

          <Box
            sx={{
              flex: 1,
              width: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <List
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                overflowY: "auto",
                overflowX: "hidden",
                top: 0,
                bottom: 0,
                p: 0,
              }}
            >
              {purchases.map((purchase: any) => (
                <ListItem
                  key={`${purchase.user.id}-${purchase.product.id}`}
                  sx={{ borderBottom: "1px solid rgb(128,128,128,0.15)" }}
                >
                  <PurchaseItem item={purchase} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
