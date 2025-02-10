import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useGridContext } from "../hooks";
import { Replay5Rounded } from "@mui/icons-material";
//import { useDebounceWithTimeout } from "@/hooks/debounce";
import {
  formatText,
  formatUrl,
  generateUrlSlug,
  turkish_chars,
} from "../../utils";
import { createLecture, getLectureSlugPrefix } from "@/api/lectures";
import { createProduct } from "@/api/products";
import { useDebounceWithTimeout } from "@/hooks/debounce";

interface FormProps {
  onClose: () => void;
}

export const AddLectureForm: React.FC<FormProps> = ({ onClose }) => {
  const [form, setForm] = useState<any>({ slug: "" });
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { setValue } = useGridContext();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    let val = value;
    setErrors((prev) => prev.filter((p) => p !== name));
    if (name === "slug") {
      setSlugError(false);
      val = formatUrl(val);
    }
    setForm((prev: object) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async () => {
    const {
      slug,
      name,
      introVideo,
      introThumbnail,
      mainVideo,
      mainThumbnail,
      price,
      duration,
      description,
    } = form;

    try {
      const list = [];
      if (!slug) list.push("slug");
      if (!name) list.push("name");
      if (!mainVideo) list.push("mainVideo");
      if (!mainThumbnail) list.push("mainThumbnail");
      if (!price || Number(price) <= 0) list.push("price");
      if (!duration || Number(duration) <= 0) list.push("duration");

      if (list.length > 0 || slugError) {
        setErrors(list);
        return;
      }

      setLoading(true);

      const temp = {
        slug: formatUrl(slug),
        name: formatText(name),
        introVideo: formatUrl(introVideo),
        introThumbnail: formatUrl(introThumbnail),
        mainVideo: formatUrl(mainVideo),
        mainThumbnail: formatUrl(mainThumbnail),
        price: Number(price),
        duration: Number(duration),
        description: formatText(description),
      };
      console.log(temp);
      const result = await createLecture({ ...temp });

      setLoading(false);
      if (!!result) {
        setValue((prev) => [...prev, result]);
        onClose();
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const [slugLoading, setSlugLoading] = useState(false);
  const [slugError, setSlugError] = useState(false);
  const [edit, setEdit] = useState(false);

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

  /* const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    if (key === " " || key === "") {
      event.preventDefault();
      return;
    }
  }; */

  return (
    <>
      <>
        <Paper
          style={{
            padding: "8px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "stretch",
            gap: 10,
            position: "sticky",
            top: 0,
            zIndex: 1000,
            borderRadius: "0px",
          }}
          sx={{
            "& .MuiButton-root": {
              textTransform: "none",
              fontWeight: 600,
              opacity: 0.9,
            },
          }}
          elevation={4}
        >
          <Button
            variant='contained'
            onClick={onClose}
            sx={{
              bgcolor: "secondary.main",
              "&:hover": { color: "secondary.main", bgcolor: "#fff" },
            }}
          >
            {"Vazgeç"}
          </Button>

          <Button
            variant='contained'
            onClick={handleSubmit}
            sx={{
              bgcolor: "primary.main",
              minWidth: 82,
              "&:hover": { color: "primary.main", bgcolor: "#fff" },
            }}
            disabled={loading}
          >
            {!loading ? (
              <>{"Kaydet"}</>
            ) : (
              <CircularProgress size={20} sx={{ color: "#fff" }} />
            )}
          </Button>
        </Paper>
      </>

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
          <TextField
            label='Başlık'
            name='name'
            defaultValue={""}
            error={errors.includes("name")}
            onChange={handleChange}
          />

          <div
            style={{
              position: "relative",
            }}
          >
            <TextField
              label='Url Dizini'
              fullWidth
              name='slug'
              value={form.slug}
              onChange={handleChange}
              error={errors.includes("slug") || slugError}
              //onKeyDown={onKeyDown}
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
                  <CircularProgress sx={{ color: "primary.main" }} size={20} />
                </Box>
              )}
              <IconButton disabled={slugLoading} onClick={handleSlug}>
                <Replay5Rounded style={{ color: "primary.main" }} />
              </IconButton>
            </div>
          </div>

          <TextField
            label='Önsöz Resim Dizini'
            name='introThumbnail'
            defaultValue={""}
            error={errors.includes("introThumbnail")}
            onChange={handleChange}
          />

          <TextField
            label='Önsöz Video Dizini'
            name='introVideo'
            defaultValue={""}
            error={errors.includes("introVideo")}
            onChange={handleChange}
          />

          <TextField
            label='Video Resim Dizini'
            name='mainThumbnail'
            defaultValue={""}
            error={errors.includes("mainThumbnail")}
            onChange={handleChange}
          />

          <TextField
            label='Eğitim Videosu Dizini'
            name='mainVideo'
            defaultValue={""}
            error={errors.includes("mainVideo")}
            onChange={handleChange}
          />

          <TextField
            label='Ücret'
            name='price'
            type='number'
            defaultValue={0}
            error={errors.includes("price")}
            onChange={handleChange}
          />

          <TextField
            label='Süre'
            name='duration'
            type='number'
            defaultValue={0}
            error={errors.includes("duration")}
            onChange={handleChange}
          />

          <TextField
            label='Açıklama'
            name='description'
            defaultValue={""}
            multiline
            minRows={2}
            maxRows={16}
            error={errors.includes("introThumbnail")}
            onChange={handleChange}
          />
        </Box>
      </FormControl>
    </>
  );
};

interface AddProductFormProps {
  onClose: () => void;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({ onClose }) => {
  const [form, setForm] = useState<any>({
    slug: "",
  });
  const [loading, setLoading] = useState(false);
  const { setValue } = useGridContext();
  const [slugLoading, setSlugLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSlug = async () => {
    setSlugLoading(true);
    const slug = generateUrlSlug(form.name ?? "");
    setForm((prev: Record<string, unknown>) => ({ ...prev, slug }));
    setSlugLoading(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!form.slug || !form.name || !form.price) {
        return;
      }
      const result = await createProduct(form);

      if (!!result) {
        setValue((prev) => [...prev, result]);
        onClose();
        //window.location.reload();
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <>
      <>
        <Paper
          style={{
            padding: "8px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "stretch",
            gap: 10,
            position: "sticky",
            top: 0,
            zIndex: 1000,
            borderRadius: "0px",
          }}
          elevation={4}
        >
          <Button
            variant='contained'
            onClick={onClose}
            sx={{ bgcolor: "error.main", color: "#fff", textTransform: "none" }}
          >
            {"Vazgeç"}
          </Button>
          <Button
            variant='contained'
            onClick={handleSubmit}
            sx={{
              bgcolor: "success.main",
              color: "#fff",
              textTransform: "none",
              minWidth: 82,
            }}
            disabled={loading}
          >
            {!loading ? (
              <>{"Kaydet"}</>
            ) : (
              <CircularProgress size={20} sx={{ color: "#fff" }} />
            )}
          </Button>
        </Paper>
      </>

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
        <TextField
          label='Başlık'
          name='name'
          defaultValue={""}
          onChange={handleChange}
          disabled={loading}
        />

        <div
          style={{
            position: "relative",
          }}
        >
          <TextField
            label='Url Dizini'
            fullWidth
            name='slug'
            value={form.slug}
            onChange={handleChange}
            disabled={loading}
          />

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
              }}
            >
              <CircularProgress sx={{ color: "primary.main" }} size={20} />
            </Box>
          )}

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
            <IconButton disabled={slugLoading} onClick={handleSlug}>
              <Replay5Rounded style={{ color: "primary.main" }} />
            </IconButton>
          </div>
        </div>

        <TextField
          label='Resim Dizini'
          name='imgUrl'
          defaultValue={""}
          onChange={handleChange}
          disabled={loading}
        />

        <TextField
          label='Ücret'
          name='price'
          defaultValue={""}
          onChange={handleChange}
          disabled={loading}
        />

        <TextField
          label='Açıklama'
          name='description'
          defaultValue={""}
          onChange={handleChange}
          disabled={loading}
        />
      </FormControl>
    </>
  );
};
