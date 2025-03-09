import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  FormControl,
  IconButton,
  InputBase,
  Paper,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  Replay5Rounded,
  AddPhotoAlternateOutlined as ImageIcon,
} from "@mui/icons-material";
import { formatText, formatUrl, generateUrlSlug } from "../../utils";
import { createLecture, getLectureSlugPrefix } from "@/api/lectures";
import { useDebounceWithTimeout } from "@/hooks/debounce";
import { useFileUpload } from "@/components/image/hooks";
import { NavLink } from "@/components/app-bar/link";
import { BoxCard } from "@/components/box";

interface FormProps {
  onClose?: () => void;
}

const AddLecture: React.FC<FormProps> = ({ onClose }) => {
  const router = useRouter();

  const [form, setForm] = useState<any>({ slug: "", status: true });
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [slugLoading, setSlugLoading] = useState(false);
  const [slugError, setSlugError] = useState(false);

  const checkSlugUnique = useCallback(async (value: string) => {
    setSlugLoading(true);
    const formatted = formatUrl(value);
    const result = await getLectureSlugPrefix(formatted);
    setSlugError(result?.some((r: any) => r.slug === formatted));
    setSlugLoading(false);
  }, []);

  useDebounceWithTimeout(checkSlugUnique, form.slug, 500);

  const handleSlug = async () => {
    setSlugLoading(true);
    const slug = generateUrlSlug(form.name ?? "");

    const result = await getLectureSlugPrefix(slug);

    if (result.some((r: any) => r.slug === slug)) {
      let i = 2;
      let resultSlug = slug + "-" + i;
      while (result.some((q: any) => q.slug === resultSlug)) {
        i++;
        resultSlug = slug + "-" + i;
      }
      setForm((prev: any) => ({ ...prev, slug: resultSlug }));
    } else {
      setForm((prev: Record<string, unknown>) => ({ ...prev, slug }));
    }
    setSlugLoading(false);
  };

  const { selectedFiles, uploadStatus, handleFileChange, uploadFiles } =
    useFileUpload();

  const handleImage = (event?: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event);
    setErrors((prev) => prev.filter((p) => p !== "image"));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, checked } = event.target as any;

    let val = value;
    if (name === "minElo" || name === "maxElo") {
      setErrors((prev) => prev.filter((p) => p !== "elo"));
    } else {
      setErrors((prev) => prev.filter((p) => p !== name));
    }

    if (name === "slug") {
      setSlugError(false);
      val = formatUrl(val);
    }
    setForm((prev: object) => ({
      ...prev,
      [name]: name !== "status" ? val : checked,
    }));
  };

  const handleSubmit = async () => {
    const {
      slug,
      name,
      introVideo,
      mainVideo,
      price,
      duration,
      description,
      status,
      minElo,
      maxElo,
      discount,
    } = form;

    try {
      const list = [];
      if (!slug) list.push("slug");
      if (!name) list.push("name");
      if (!mainVideo) list.push("mainVideo");
      if (!price || Number(price) <= 0) list.push("price");
      if (!duration || Number(duration) <= 0) list.push("duration");
      if (selectedFiles.length === 0) list.push("image");
      if (!minElo || !maxElo) list.push("elo");

      if (list.length > 0 || slugError) {
        setErrors(list);
        return;
      }

      setLoading(true);

      const temp = {
        slug: formatUrl(slug),
        name: formatText(name),
        introVideo: introVideo ? formatUrl(introVideo) : undefined,
        mainVideo: formatUrl(mainVideo),
        thumbnail: "",
        price: Number(price),
        discount: discount ? Number(discount) : undefined,
        duration: Number(duration) * 60,
        minElo,
        maxElo,
        description: formatText(description),
        status,
      };

      const result = await createLecture({ ...temp });
      let imageResult;
      if (selectedFiles.length > 0 && !!result) {
        imageResult = await uploadFiles(result.id, "lecture");
      } else {
        imageResult = true;
      }
      setLoading(false);
      if (!!result && !!imageResult) {
        if (!!onClose) {
          onClose();
        } else {
          router.push(`/admin/lectures`);
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
        <Typography variant={"h6"}>{`Yeni Eğitim`}</Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <NavLink href={`/admin/lectures`}>
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
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "stretch",
          flex: 1,
          "& .MuiTextField-root": {
            my: 0.2,
          },
          "& .MuiFormLabel-root": {},
        }}
      >
        <Box
          sx={{
            position: { xs: "absolute", md: "relative" },
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            padding: 2,
            pb: 3,
            display: "flex",
            flexDirection: "column",
            gap: { xs: "6px", sm: "8px", md: "10px" },
            overflowY: { xs: "auto", md: "none" },
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
              error={errors.includes("name")}
            />

            <div
              style={{
                position: "relative",
                flex: 1,
              }}
            >
              <TextField
                label='Url Dizini'
                fullWidth
                name='slug'
                value={form.slug}
                onChange={handleChange}
                error={errors.includes("slug") || slugError}
              />

              <div
                style={{
                  position: "absolute",
                  right: 8,
                  top: 9,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {slugLoading && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1,
                      bgcolor: "background.paper",
                    }}
                  >
                    <CircularProgress
                      sx={{ color: "primary.main" }}
                      size={20}
                    />
                  </Box>
                )}
                <IconButton disabled={slugLoading} onClick={handleSlug}>
                  <Replay5Rounded style={{ color: "primary.main" }} />
                </IconButton>
              </div>
            </div>
          </Box>

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
                borderColor: errors.includes("image")
                  ? "error.main"
                  : "divider",
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
                  selectedFiles.length > 0
                    ? "Fotoğrafı Değiştir"
                    : "Fotoğraf Ekle"
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

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 0.8, md: 1.2, lg: 2 },
            }}
          >
            <TextField
              label='Eğitim Videosu'
              name='mainVideo'
              error={errors.includes("mainVideo")}
              onChange={handleChange}
              sx={{ flex: 1 }}
            />

            <TextField
              label='Giriş Videosu'
              name='introVideo'
              error={errors.includes("introVideo")}
              onChange={handleChange}
              sx={{ flex: 1 }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 0.8, md: 1.2, lg: 2 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: { xs: 0.8, md: 1.2, lg: 2 },
                flex: 2,
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
                  defaultChecked={form.status}
                  onChange={handleChange}
                />
              </BoxCard>

              <TextField
                name={"duration"}
                label={"Süre (dk)"}
                error={errors.includes("duration")}
                onChange={handleChange}
                sx={{ minWidth: { xs: 150, md: 180 }, flex: 3 }}
              />
            </Box>

            <BoxCard
              title={"Seviye Aralığı:"}
              sx={{
                bgcolor: "background.paper",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                py: 0,
                minWidth: { xs: 150, sm: 160, md: 180 },
                borderColor: errors.includes("elo") && "error.main",
              }}
            >
              <TextField
                variant={"standard"}
                name={"minElo"}
                type={"number"}
                sx={{ flex: 1 }}
                defaultValue={0}
                onChange={handleChange}
              />
              {"-"}
              <TextField
                variant={"standard"}
                name={"maxElo"}
                type={"number"}
                defaultValue={2800}
                onChange={handleChange}
              />
            </BoxCard>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 0.8, md: 1.2, lg: 2 },
            }}
          >
            <TextField
              name={"price"}
              label={"Ücret"}
              error={errors.includes("price")}
              type={"number"}
              sx={{ flex: 1 }}
              onChange={handleChange}
            />

            <TextField
              name={"discount"}
              label={"İndirim"}
              //error={errors.includes("price")}
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
            //error={errors.includes("description")}
            onChange={handleChange}
          />
        </Box>
      </FormControl>
    </>
  );
};

export default AddLecture;
