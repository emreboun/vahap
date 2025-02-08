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
import { deleteLecture } from "@/api/firebase/lecture";

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
      /* case "kategoriler":
        result = await deleteKatById(itemId);
        break;
      case "sorular":
        result = await deleteSoruById(itemId);
        break;
      case "cevaplar":
        result = await deleteCevapById(itemId);
        break;
      case "urunler":
        result = await deleteProductById(itemId);
        break;
      case "yonlendirmeler":
        result = await deleteRedirection(itemId);
        break; */
      case "lectures":
        result = await deleteLecture(id);
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
        <Typography sx={{ py: 0, pl: 1 }}>
          {"Silmek için Satırın Id'sini Girin"}
        </Typography>

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
            sx={{ bgcolor: "warning.main", color: "#fff" }}
          >
            {"Vazgeç"}
          </Button>

          <Button
            variant='contained'
            type='submit'
            onClick={handleSubmit}
            sx={{ bgcolor: "error.main", color: "#fff" }}
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
