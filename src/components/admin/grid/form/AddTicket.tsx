import {
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Collapse,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";

import {
  AddPhotoAlternateOutlined as ImageIcon,
  Replay5Rounded,
} from "@mui/icons-material";
import { formatText, formatUrl, generateUrlSlug } from "../../utils";
import { NavLink } from "@/components/app-bar/link";
import { useFileUpload } from "@/components/image/hooks";
import { useRouter } from "next/navigation";
import { useDebounceWithTimeout } from "@/hooks/debounce";
import { BoxCard } from "@/components/box";
import { SearchBar } from "@/components/search/SearchBar";
import { searchLectures } from "@/api/lectures";
import { formatDuration } from "@/utils/data";
import { createTicket } from "@/api/products/tickets";

interface AddTicketFormProps {
  onClose?: () => void;
}

const AddTicket: React.FC<AddTicketFormProps> = ({ onClose }) => {
  const router = useRouter();

  const [form, setForm] = useState<any>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

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
    const { name, price, discount, date, url, location, capacity, sold } = form;

    try {
      const list = [];
      if (!name) list.push("name");
      if (!price || Number(price) <= 0) list.push("price");
      //if (!discount || Number(discount) <= 0) list.push("duration");
      if (list.length > 0) {
        setErrors(list);
        return;
      }

      setLoading(true);

      const temp = {
        name: formatText(name),
        date,
        url,
        location,
        capacity,
        sold,
        price: Number(price),
        discount,
      };

      const result = await createTicket({ ...temp });
      console.log(result);

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
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [lectures, setLectures] = useState<any[]>([]);

  const onSearch = useCallback(
    async (text: string) => {
      if (text.length < 3) {
        setSearchResult([]);
      } else {
        const resultList = await searchLectures(text);
        const res = resultList.filter(
          (item) => !lectures.some((l) => l.id === item.id)
        );
        setSearchResult(res);
      }
    },
    [lectures]
  );

  const handleAddLecture = (lectureData: any) => {
    setLectures((prev: any) =>
      !prev.some((p: any) => p.id === lectureData.id)
        ? [...prev, lectureData]
        : prev
    );
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
          gap: "12px",
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
            gap: { xs: 1.4, md: 1.2, lg: 2 },
          }}
        >
          <TextField
            name={"name"}
            label={"Başlık"}
            onChange={handleChange}
            sx={{ flex: 1 }}
          />

          <TextField
            name={"date"}
            label={"Tarih"}
            type={"datetime-local"}
            onChange={handleChange}
            defaultValue={new Date().toISOString().slice(0, 16)}
            sx={{ flex: 1 }}
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
              //px: { xs: 2, sm: 3, md: 4 },
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
            name={"price"}
            label={"Ücret"}
            type={"number"}
            sx={{ flex: 1 }}
            onChange={handleChange}
          />

          <TextField
            name={"discount"}
            label={"İndirim"}
            type={"number"}
            sx={{ flex: 1 }}
            onChange={handleChange}
          />
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
