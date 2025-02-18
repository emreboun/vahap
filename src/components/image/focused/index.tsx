import { CloseSharp } from "@mui/icons-material";
import { Box, IconButton, Modal as MuiModal, Paper } from "@mui/material";
import Image from "next/image";

interface Props {
  image?: string | null; //ImageFile | null;
  onClose: () => void;
}

export const FocusedImage: React.FC<Props> = ({ image, onClose }) => {
  const handleClose = () => {};

  return (
    <>
      <MuiModal open={!!image} onClose={onClose} disableScrollLock>
        <>
          <IconButton
            onClick={onClose}
            sx={{
              bgcolor: "background.paper",
              aspectRatio: 1,
              position: "fixed",
              top: 12,
              left: "50%",
              zIndex: 2000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "translateX(-50%)",
            }}
          >
            <CloseSharp
              sx={{
                color: "text.primary",
                mx: 0.5,
              }}
            />
          </IconButton>

          <Box
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              height: { xs: "80%", md: "80%", lg: "70%" },
              width: { xs: "100%", md: "100%", lg: "90%", xl: "80%" },
              borderRadius: "4px",
              border: "1px",
            }}
            onClick={onClose}
          >
            <>
              {!!image && (
                <Image
                  src={image.replace("public", "")}
                  alt="Ürün Resmi"
                  fill
                  style={{
                    objectFit: "contain",
                    //background: "#fff",
                    borderRadius: 4,
                  }}
                />
              )}
            </>
          </Box>
        </>
      </MuiModal>
    </>
  );
};
