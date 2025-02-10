import { useState } from "react";

import { Paper, Box, Modal, Button } from "@mui/material";

import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { AddLectureForm, AddProductForm } from "../form";
import { useParams } from "next/navigation";

interface Props {
  data: any[];
}

export const CustomToolbar: React.FC<Props> = ({ data }) => {
  const params = useParams();
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal((prev) => !prev);
  };

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

          {(params.table === "lectures" || params.table === "products") && (
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
              onClick={handleModal}
            >
              {"Yeni Oluştur"}
            </Button>
          )}
        </Box>
      </GridToolbarContainer>

      <Modal open={modal} onClose={() => setModal(false)}>
        <Paper
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: { xs: "100%", sm: "100%", md: "500px" },
            height: { xs: "100%", md: "auto" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          {params.table === "lectures" && (
            <AddLectureForm onClose={handleModal} />
          )}
          {params.table === "products" && (
            <AddProductForm onClose={handleModal} />
          )}
        </Paper>
      </Modal>
    </>
  );
};
