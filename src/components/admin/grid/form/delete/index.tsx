import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useGridContext } from "../../hooks";
import { GridRowId } from "@mui/x-data-grid";
import { deleteLecture } from "@/api/lectures";
import { deleteProduct } from "@/api/products";

interface FormProps {
  itemId: GridRowId;
  onClose: () => void;
}

export const DeleteForm: React.FC<FormProps> = ({ itemId, onClose }) => {
  const params = useParams();
  const { table } = params;
  //const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<string>("");

  const { setValue } = useGridContext();

  const handleChange = (event: any) => {
    const { value } = event.target;
    setId(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let result;
    switch (table) {
      case "lectures":
        result = await deleteLecture(id);
        break;
      case "products":
        result = await deleteProduct(id);
        break;
    }
    if (!!result) {
      setValue((prev) => prev.filter((p) => p.id !== itemId));
      onClose();
    }
  };

  return (
    <>
      <FormControl
        component='form'
        sx={{
          p: "24px 16px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Box>
          <Typography sx={{ py: 0, pl: 1 }}>
            {"Silmek için Satırın Id'sini Girin"}
          </Typography>
          <Typography sx={{ pt: 1, pl: 1, fontStyle: "italic" }}>
            {itemId}
          </Typography>
        </Box>
        <TextField label='ID' name='id' value={id} onChange={handleChange} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant='contained'
            onClick={onClose}
            sx={{
              bgcolor: "warning.main",
              color: "#fff",
              textTransform: "none",
            }}
          >
            {"Vazgeç"}
          </Button>

          <Button
            variant='contained'
            type='submit'
            onClick={handleSubmit}
            sx={{ bgcolor: "error.main", color: "#fff", textTransform: "none" }}
            disabled={loading || id !== itemId}
          >
            {!loading ? (
              <>{"Sil"}</>
            ) : (
              <CircularProgress sx={{ color: "#fff", fontSize: 20 }} />
            )}
          </Button>
        </Box>
      </FormControl>
    </>
  );
};
