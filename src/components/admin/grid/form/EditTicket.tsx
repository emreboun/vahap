import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { NavLink } from "@/components/app-bar/link";
import { useRouter } from "next/navigation";
import { updateTicket } from "@/api/products/tickets";

interface EditTicketFormProps {
  onClose?: () => void;
  data: any;
}

const EditTicket: React.FC<EditTicketFormProps> = ({ data, onClose }) => {
  const router = useRouter();
  const { id } = data;

  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event: any) => {
    const { name, value, checked } = event.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: name !== "status" ? value : checked,
    }));
  };

  const handleSubmit = async () => {
    const req: any = {
      ...form,
    };
    req.date = form.date ? new Date(form.date) : undefined;
    req.capacity = req.capacity ? req.capacity * 1 : undefined;
    Object.keys(req).forEach((key) => {
      if (req[key] === data[key]) {
        delete req[key];
      }
    });

    const result = await updateTicket(id, req);

    if (!!result) {
      router.push(`/admin/tickets`);
    }
  };

  return (
    <>
      <Paper
        sx={{
          px: 3,
          py: 2,
          borderRadius: 0,
          position: "sticky",
          top: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant={"h6"}>{`Bileti Düzenle`}</Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <NavLink href={`/admin/tickets`}>
            <Button
              variant='contained'
              sx={{
                bgcolor: "secondary.main",
                textTransform: "none",
                "&:hover": { color: "secondary.main", bgcolor: "#fff" },
              }}
            >
              {"Vazgeç"}
            </Button>
          </NavLink>

          <Button
            variant='contained'
            sx={{
              textTransform: "none",
              minWidth: 82,
              "&:hover": { color: "primary.main", bgcolor: "#fff" },
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {!loading ? (
              <>{"Kaydet"}</>
            ) : (
              <CircularProgress size={20} sx={{ color: "#fff" }} />
            )}
          </Button>
        </Box>
      </Paper>

      <FormControl
        component={"form"}
        sx={{
          position: "relative",
          padding: 2,
          pb: 3,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
          display: "flex",
          flexDirection: "column",
          gap: { xs: 0.8, md: 1.2, lg: 2 },
          alignItems: "stretch",
          "& .MuiTextField-root": {
            my: 0.2,
          },
          "& .MuiFormLabel-root": {},
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 0.8, md: 1.2, lg: 2 },
          }}
        >
          <TextField
            name={"name"}
            label={"Başlık"}
            defaultValue={data.name}
            onChange={handleChange}
            sx={{ flex: 1 }}
          />

          <TextField
            name={"date"}
            label={"Tarih"}
            type={"datetime-local"}
            onChange={handleChange}
            defaultValue={new Date(
              new Date(data.date).getTime() + 3 * 60 * 60 * 1000
            )
              .toISOString()
              .slice(0, 16)}
            sx={{ flex: 1 }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 0.8, md: 1.2, lg: 2 },
            flex: 4,
          }}
        >
          <TextField
            name={"url"}
            label={"Url"}
            defaultValue={data.url}
            sx={{ flex: 1 }}
            onChange={handleChange}
          />

          <TextField
            name={"location"}
            label={"Lokasyon"}
            defaultValue={data.location}
            sx={{ flex: 1 }}
            onChange={handleChange}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 0.8, md: 1.2, lg: 2 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: { xs: 0.8, md: 1.2, lg: 2 },
              flex: 4,
            }}
          >
            <TextField
              name={"capacity"}
              label={"Kapasite"}
              defaultValue={data.capacity}
              type={"number"}
              sx={{ flex: 1 }}
              onChange={handleChange}
            />
          </Box>
        </Box>

        <TextField
          label='Açıklama'
          name='description'
          defaultValue={""}
          multiline
          minRows={6}
          maxRows={16}
          onChange={handleChange}
          disabled={loading}
        />
      </FormControl>
    </>
  );
};
export default EditTicket;
