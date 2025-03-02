import { useState } from "react";

import { Box, Button } from "@mui/material";

import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useParams } from "next/navigation";
import { NavLink } from "@/components/app-bar/link";

interface Props {
  data: any[];
}

export const CustomToolbar: React.FC<Props> = ({ data }) => {
  const params = useParams();
  const { table } = params;

  return (
    <>
      <GridToolbarContainer
        sx={{
          "& .MuiButtonBase-root": {
            minWidth: 85,
            textTransform: "none",
            textWrap: "nowrap",
          },
          displaY: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 0.4,
          pb: { xs: 0.6, md: 0.4 },
          pr: 1,
          overflowX: "auto",
          overflowY: "hidden",
          minHeight: 36,
          boxShadow: 1,
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <Box sx={{ display: "flex", gap: 1, px: 1 }}>
          <GridToolbarFilterButton
            slotProps={{
              tooltip: { title: "Filtrele" },
              button: {
                color: "secondary",
                sx: { flex: { xs: 1, md: 0 } },
              },
            }}
          />

          <GridToolbarColumnsButton
            slotProps={{
              tooltip: { title: "Sütunlar" },
              button: {
                color: "secondary",
                sx: { flex: { xs: 1, md: 0 } },
              },
            }}
          />
          <GridToolbarDensitySelector
            slotProps={{
              tooltip: { title: "Yoğunluk ayarı" },
              button: {
                color: "secondary",
                sx: { flex: { xs: 1, md: 0 } },
              },
            }}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 1, px: 1 }}>
          <GridToolbarExport
            slotProps={{
              tooltip: { title: "İndir" },
              button: {
                variant: "outlined",
                color: "secondary",
                sx: { flex: { xs: 1, md: 0 }, boxShadow: 2 },
                style: { minWidth: 108 },
              },
            }}
          />

          {(table === "lectures" ||
            table === "products" ||
            table === "tickets") && (
            <NavLink href={`/admin/${table}/add`}>
              <Button
                variant={"contained"}
                className={"limitedLine"}
                sx={{
                  fontSize: 13,
                  alignSelf: "center",
                  py: "3px",
                  minWidth: 107,
                  flex: { xs: 1, md: 0 },
                  boxShadow: 2,
                }}
                style={{ minWidth: 108, color: "#fff" }}
              >
                {"Yeni Oluştur"}
              </Button>
            </NavLink>
          )}
        </Box>
      </GridToolbarContainer>
    </>
  );
};
