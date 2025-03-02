import {
  CheckRounded,
  Close,
  Delete,
  DeleteForever,
  Edit,
} from "@mui/icons-material";
import { Box, Chip, IconButton, Tooltip } from "@mui/material";
interface EditButtonProps {
  some?: any;
}
const EditButton: React.FC<EditButtonProps> = () => {
  return (
    <>
      <Tooltip title={"Düzenle"}>
        <Chip
          label={
            <IconButton
              //onClick={toggleEdit}
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
                    fontSize: 18,
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
    </>
  );
};
export default EditButton;
