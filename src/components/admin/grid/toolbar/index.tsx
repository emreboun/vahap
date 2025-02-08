import { useState } from "react";

import { Paper, Box, Modal, Button } from "@mui/material";

import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { AddLectureForm, RedirectionForm } from "../form";
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
          flexWrap: "nowrap",
          overflowX: "auto",
          overflowY: "hidden",
          minHeight: 36,
          boxShadow: 1,
          zIndex: 1,
        }}
      >
        <GridToolbarFilterButton
          slotProps={{
            tooltip: { title: "Filtrele" },
          }}
        />

        <GridToolbarColumnsButton
          slotProps={{
            tooltip: { title: "Sütunlar" },
          }}
        />
        <GridToolbarDensitySelector
          slotProps={{
            tooltip: { title: "Yoğunluk ayarı" },
          }}
        />
        <Box sx={{ flexGrow: 1, minWidth: 40 }} />

        <GridToolbarExport
          slotProps={{
            tooltip: { title: "İndir" },
            button: {
              variant: "outlined",
              style: { minWidth: 108 },
            },
          }}
        />

        {(params.table === "lectures" || params.table === "yonlendirmeler") && (
          <Button
            variant={"outlined"}
            className={"limitedLine"}
            sx={{ fontSize: 13, alignSelf: "center", py: "3px", minWidth: 107 }}
            style={{ minWidth: 108 }}
            onClick={handleModal}
          >
            {"Yeni Oluştur"}
          </Button>
        )}
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
          }}
        >
          {params.table === "lectures" && (
            <AddLectureForm onClose={handleModal} />
          )}
          {params.table === "yonlendirmeler" && (
            <RedirectionForm redirections={data} onClose={handleModal} />
          )}
        </Paper>
      </Modal>
    </>
  );
};
