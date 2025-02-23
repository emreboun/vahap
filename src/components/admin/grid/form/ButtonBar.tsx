import { useToggle } from "@/hooks/useToggle";
import {
  CheckRounded,
  Close,
  Delete,
  DeleteForever,
  Edit,
} from "@mui/icons-material";
import { Box, Chip, Collapse, IconButton, Tooltip } from "@mui/material";

interface ButtonProps {
  onClick: () => void;
  name: string;
}

interface ButtonBarProps {
  edit: boolean;
  del: boolean;
  toggleEdit: () => void;
  toggleDel: () => void;
  onSubmit: () => void;
}

const ButtonBar: React.FC<ButtonBarProps> = ({
  edit,
  del,
  toggleEdit,
  toggleDel,
  onSubmit,
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, px: 2 }}>
      <Collapse orientation={"horizontal"} in={!edit}>
        <Tooltip title={!del ? "Sil" : "Vazgeç"} sx={{}}>
          <Chip
            label={
              <IconButton
                onClick={toggleDel}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 30,
                  width: 30,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                  }}
                >
                  <Delete
                    sx={{
                      transform: `rotate(${del ? "225deg" : "0deg"})`,
                      transition: "all 0.2s ease-in-out",
                      fontSize: 17,
                      opacity: !del ? 1 : 0,
                    }}
                  />
                  <Close
                    sx={{
                      zIndex: 1000,
                      position: "absolute",
                      top: 3,
                      bottom: 0,
                      right: 0,
                      left: -2,
                      fontSize: 22,
                      transform: `rotate(${!del ? "225deg" : "0deg"})`,
                      transition: "all 0.2s ease-in-out",
                      opacity: del ? 1 : 0,
                    }}
                  />
                </Box>
              </IconButton>
            }
            sx={{
              bgcolor: "background.paper",
              border: "1px solid rgb(128,128,128,0.25)",
              boxShadow: 4,
              "& .MuiChip-label": { padding: 0 },
            }}
            variant={"outlined"}
          />
        </Tooltip>
      </Collapse>

      <Collapse orientation={"horizontal"} in={del} unmountOnExit>
        <Tooltip title={"Sil"} sx={{}}>
          <Chip
            label={
              <IconButton
                onClick={onSubmit}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 30,
                  width: 30,
                }}
              >
                <DeleteForever
                  sx={{
                    fontSize: 20,
                    color: "error.main",
                  }}
                />
              </IconButton>
            }
            sx={{
              bgcolor: "background.paper",
              border: "1px solid rgb(128,128,128,0.25)",
              boxShadow: 4,
              "& .MuiChip-label": { padding: 0 },
              transition: "all 0.2s ease-in-out",
              opacity: del ? 1 : 0,
              visibility: del ? "visible" : "hidden",
              mb: 0.15,
              p: 0,
            }}
            variant={"outlined"}
          />
        </Tooltip>
      </Collapse>

      <Collapse orientation={"horizontal"} in={!del} unmountOnExit>
        <Tooltip title={edit ? "Vazgeç" : "Düzenle"}>
          <Chip
            label={
              <IconButton
                onClick={toggleEdit}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 30,
                  width: 30,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                  }}
                >
                  <Edit
                    sx={{
                      transform: `rotate(${edit ? "225deg" : "0deg"})`,
                      transition: "all 0.2s ease-in-out",
                      fontSize: 18,
                      opacity: !edit ? 1 : 0,
                    }}
                  />
                  <Close
                    sx={{
                      zIndex: 1000,
                      position: "absolute",
                      top: 3,
                      bottom: 0,
                      right: 0,
                      left: -2,
                      fontSize: 22,
                      transform: `rotate(${!edit ? "225deg" : "0deg"})`,
                      transition: "all 0.2s ease-in-out",
                      opacity: edit ? 1 : 0,
                    }}
                  />
                </Box>
              </IconButton>
            }
            sx={{
              bgcolor: "background.paper",
              border: "1px solid rgb(128,128,128,0.25)",
              boxShadow: 4,
              "& .MuiChip-label": { padding: 0 },
            }}
            variant={"outlined"}
          />
        </Tooltip>
      </Collapse>

      <Tooltip title={"Kaydet"} sx={{}}>
        <Chip
          label={
            <IconButton
              onClick={onSubmit}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 30,
                width: 30,
              }}
            >
              <CheckRounded
                sx={{
                  fontSize: 20,
                }}
              />
            </IconButton>
          }
          sx={{
            bgcolor: "background.paper",
            border: "1px solid rgb(128,128,128,0.25)",
            boxShadow: 4,
            "& .MuiChip-label": { padding: 0 },
            transition: "all 0.2s ease-in-out",
            opacity: edit ? 1 : 0,
            visibility: edit ? "visible" : "hidden",
            mb: 0.15,
            p: 0,
          }}
          variant={"outlined"}
        />
      </Tooltip>
    </Box>
  );
};

export default ButtonBar;
