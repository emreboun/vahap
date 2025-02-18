"use client";
import { useState } from "react";

import { Box, Button, Tooltip } from "@mui/material";
import {
  AddPhotoAlternateOutlined as ImageIcon,
  AddAPhotoOutlined as PhotoIcon,
  CancelRounded as CancelIcon,
} from "@mui/icons-material";
import Image from "next/image";
import { FocusedImage } from "../focused";

interface PhotoListProps {
  photos: any[];
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  isAdmin?: boolean;
  showLabel?: boolean;
}

export const PhotoList: React.FC<PhotoListProps> = ({
  photos,
  onChange,
  isAdmin = false,
  showLabel = true,
}) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleUnselect = () => {
    setSelected(null);
  };

  return (
    <>
      <FocusedImage image={selected} onClose={handleUnselect} />

      <Box
        component="label"
        sx={{
          display: showLabel ? "block" : "none",
          position: "absolute",
          zIndex: 2,
          color: "text.secondary",
          top: -6,
          left: 16,
          fontSize: 12,
          px: 1,
          background: !isAdmin
            ? "linear-gradient(0deg, transparent 45%, #f9fafb 55%)"
            : (theme) => `${theme.palette.background.paper}`,
        }}
      >
        {"Fotoğraflar"}
      </Box>

      <Box
        sx={{
          height: "100%",
          width: "100%",
          overflowY: "hidden",
          overflowX: "auto",
          position: "relative",
          borderRadius: "4px",
          border: "1px solid",
          borderColor: "divider",
          background: !isAdmin
            ? "#f9fafb"
            : (theme) => `${theme.palette.background.paper}`,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            columnGap: "16px",
            padding: "16px 16px 12px",
            //height: 300,
          }}
        >
          {photos.map((file, i) =>
            file.preview || file.path ? (
              <Button
                key={i}
                sx={{
                  border: "2px solid",
                  borderColor: "divider",
                  borderRadius: "4px",
                  overflow: "hidden",
                  padding: 0,
                  height: 100,
                  width: 100,
                  "&:hover": {
                    borderColor: "primary.main",
                  },
                }}
                onClick={() => setSelected(file.preview ?? file.path)}
              >
                <Image
                  src={file.preview || file.path.replace("public", "")}
                  alt="preview"
                  style={{ borderRadius: 6 }}
                  width={100}
                  height={100}
                />
              </Button>
            ) : null
          )}

          {!!onChange && (
            <>
              <Button
                sx={{
                  height: 100,
                  width: 100,
                  bgcolor: (theme) => `${theme.palette.background.paper}`,
                  color: "text.secondary",
                  border: "2px solid",
                  borderColor: "divider",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "primary.main",
                    color: "primary.main",
                  },
                }}
                type={"reset"}
                onClick={() => onChange()}
              >
                <CancelIcon />
                {"İptal Et"}
              </Button>

              <Box className="file-input" style={{ height: 100, width: 100 }}>
                <input
                  className="input-hidden"
                  id="input-base"
                  multiple
                  type={"file"}
                  onChange={onChange}
                  hidden
                />

                <Tooltip title={"Fotoğraf Ekle"}>
                  <Box
                    component="label"
                    htmlFor="input-base"
                    className="file-label-2"
                    sx={{
                      bgcolor: (theme) => `${theme.palette.background.paper}`,
                      border: "2px solid",
                      borderColor: "divider",
                      color: "text.secondary",

                      "&:hover": {
                        borderColor: "primary.main",
                        color: "primary.main",
                      },
                    }}
                  >
                    <ImageIcon sx={{ fontSize: 44 }} />
                  </Box>
                </Tooltip>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
