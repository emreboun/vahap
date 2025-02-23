/* import React from "react";
import {
  Box,
  ButtonBase,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  AddPhotoAlternateOutlined as ImageIcon,
} from "@mui/icons-material";

const ImageForm: React.FC<any> = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 1.4, md: 1.2, lg: 2 },
        }}
      >
        <Box
          sx={{
            flex: 1,
            position: "relative",
            display: "flex",
            alignItems: "center",
            border: "1px solid",
            borderColor: errors.includes("image") ? "error.main" : "divider",
            bgcolor: "background.paper",
            minHeight: 54,
          }}
        >
          <Typography sx={{ pl: 1.6 }}>
            {selectedFiles.length > 0
              ? selectedFiles[0].file.name
              : "Thumbnail"}
          </Typography>

          <input
            className='input-hidden'
            id='input-base'
            type={"file"}
            name={"image"}
            onChange={handleImage}
            hidden
          />

          <Tooltip
            title={
              selectedFiles.length > 0 ? "Fotoğrafı Değiştir" : "Fotoğraf Ekle"
            }
          >
            <ButtonBase
              component='label'
              htmlFor='input-base'
              sx={{
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,

                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <ImageIcon sx={{ fontSize: 32, mr: 1.5 }} />
            </ButtonBase>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
};

export default ImageForm;
 */
