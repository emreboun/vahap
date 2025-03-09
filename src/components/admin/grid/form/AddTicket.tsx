import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { formatText } from "../../utils";
import { NavLink } from "@/components/app-bar/link";
import { useRouter } from "next/navigation";
import { BoxCard } from "@/components/box";

import { createTicket } from "@/api/products/tickets";
import { validateDate } from "./utils";

interface AddTicketFormProps {
  onClose?: () => void;
}

const AddTicket: React.FC<AddTicketFormProps> = ({ onClose }) => {
  const router = useRouter();

  const [form, setForm] = useState<any>({ status: true });
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, checked } = event.target as any;

    setErrors((prev) => prev.filter((p) => p !== name));

    setForm((prev: object) => ({
      ...prev,
      [name]: name !== "status" ? value : checked,
    }));
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    const { name, price, discount, date, url, location, capacity, status } =
      form;

    try {
      const list = [];
      if (!name) list.push("name");
      if (!price || Number(price) <= 0) list.push("price");
      if (!validateDate(date)) list.push("date");
      if (!capacity || Number(capacity) <= 0) list.push("capacity");

      if (list.length > 0) {
        setErrors(list);
        return;
      }

      setLoading(true);

      const temp = {
        name: formatText(name),
        date: new Date(date),
        url,
        location,
        capacity: Number(capacity),
        price: Number(price),
        discount: discount ? Number(discount) : undefined,
        status,
      };
      const result = await createTicket({ ...temp });

      setLoading(false);
      if (!!result) {
        if (!!onClose) {
          onClose();
        } else {
          router.push(`/admin/tickets`);
        }
      }
    } catch (e) {
      setLoading(false);
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
        <Typography variant={"h6"}>{`Yeni Bilet`}</Typography>

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
            onChange={handleChange}
            sx={{ flex: 1 }}
            required={true}
            error={submitted && errors.includes("name")}
            helperText={
              submitted && errors.includes("name") && "Bu alan zorunlu."
            }
          />

          <TextField
            name={"date"}
            label={"Tarih"}
            type={"datetime-local"}
            onChange={handleChange}
            defaultValue={new Date().toISOString().slice(0, 16)}
            sx={{ flex: 1 }}
            required={true}
            error={submitted && errors.includes("date")}
            helperText={
              submitted && errors.includes("date") && "Bu alan zorunlu."
            }
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
            sx={{ flex: 1 }}
            onChange={handleChange}
          />

          <TextField
            name={"location"}
            label={"Lokasyon"}
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
            <BoxCard
              title={"Durum:"}
              sx={{
                bgcolor: "background.paper",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                py: 0,
                minWidth: { xs: 150, sm: 160, md: 180 },
              }}
            >
              <Typography>{form.status ? "Aktif" : "Pasif"}</Typography>
              <Switch
                name={"status"}
                sx={{}}
                defaultChecked={true}
                onChange={handleChange}
              />
            </BoxCard>

            <TextField
              name={"capacity"}
              label={"Kapasite"}
              type={"number"}
              sx={{ flex: 1 }}
              onChange={handleChange}
              required={true}
              error={submitted && errors.includes("capacity")}
              helperText={
                submitted && errors.includes("capacity") && "Bu alan zorunlu."
              }
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: { xs: 0.8, md: 1.2, lg: 2 },
              flex: 4,
            }}
          >
            <TextField
              name={"price"}
              label={"Ücret"}
              type={"number"}
              sx={{ flex: 1 }}
              onChange={handleChange}
              required={true}
              error={submitted && errors.includes("price")}
              helperText={
                submitted && errors.includes("price") && "Bu alan zorunlu."
              }
            />

            <TextField
              name={"discount"}
              label={"İndirim"}
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

export default AddTicket;
