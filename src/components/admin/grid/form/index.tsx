//import { addKat, addRedirection } from "@/app/Y/actions";
//import { Category, Redirection } from "@/components/types";
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
import { useDebounceWithTimeout } from "@/hooks/debounce";
import { generateUrlSlug } from "../../utils";
import { createLecture } from "@/api/firebase/lecture";
import { LectureEntity } from "@/types";

interface FormProps {
  //categories?: Category[];
  onClose: () => void;
}

export const AddLectureForm: React.FC<FormProps> = ({
  //categories = [],
  onClose,
}) => {
  const [form, setForm] = useState<any>({
    slug: "",
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const { setValue } = useGridContext();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev: object) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      form.slug === "" ||
      form.title === "" ||
      form.videoUrl === ""
      //categories.some((c) => c.slug === form.slug)
    ) {
      return;
    }
    const result = await createLecture(form as LectureEntity);
    if (!!result) {
      setValue((prev) => [...prev, result]);
      onClose();
      //window.location.reload();
    }
  };

  const [slugLoading, setSlugLoading] = useState(false);
  const [slugError, setSlugError] = useState(false);
  const [edit, setEdit] = useState(false);

  /* const checkSlugUnique = useCallback(
    async (value: string) => {
      if (value === form.slug) {
        return;
      } else {
        setSlugLoading(true);
        const result = await checkQuestionSlugUnique(value, form.category_id);
        setSlugError(!result);
      }
      setSlugLoading(false);
    },
    [form.slug]
  ); */

  //useDebounceWithTimeout(checkSlugUnique, form.slug, 500);

  const handleSlug = async () => {
    setSlugLoading(true);
    const slug = generateUrlSlug(form.title ?? "");
    /* let result = await getQuestionsWithSlugPrefix(slug, form.category_id);
    result = result.filter((q: any) => q.id !== soru.id);
    if (result.length !== 0 && result.some((q: any) => q.slug === slug)) {
      let i = 2;
      let resultSlug = slug + "-" + i;
      while (result.some((q: any) => q.slug === resultSlug)) {
        i++;
        resultSlug = slug + "-" + i;
      }
      setForm((prev: any) => ({ ...prev, slug: resultSlug }));
    } else { */
    setForm((prev: Record<string, unknown>) => ({ ...prev, slug }));
    // }
    setSlugLoading(false);
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
              "&:hover": { color: "primary.main", bgcolor: "#fff" },
            }}
            disabled={loading}
          >
            {!loading ? (
              <>{"Kaydet"}</>
            ) : (
              <CircularProgress sx={{ color: "#fff", fontSize: 20 }} />
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
            /* disabled={!edit}
          error={slugError}
          helperText={slugError && "Url dizini biricik olmalı."} */
            FormHelperTextProps={{
              sx: {
                pt: 0.5,
                pb: 0.8,
              },
            }}
          />
          {/* <TextField
                label="Url Dizini"
                fullWidth
                name="slug"
                value={form?.slug ?? ""}
                onChange={handleChange}
                disabled={!edit}
                error={slugError}
                helperText={slugError && "Url dizini biricik olmalı."}
                FormHelperTextProps={{
                  sx: {
                    pt: 0.5,
                    pb: 0.8,
                  },
                }}
                sx={{ opacity: slugLoading ? 0.5 : 1 }}
              />
 */}
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
          label='Başlık'
          name='title'
          defaultValue={""}
          onChange={handleChange}
        />

        <TextField
          label='Giriş Resim Dizini'
          name='introThumbnail'
          defaultValue={""}
          onChange={handleChange}
        />

        <TextField
          label='Giriş Video Dizini'
          name='introUrl'
          defaultValue={""}
          onChange={handleChange}
        />

        <TextField
          label='Video Resim Dizini'
          name='videoThumbnail'
          defaultValue={""}
          onChange={handleChange}
        />
        <TextField
          label='Eğitim Videosu Dizini'
          name='videoUrl'
          defaultValue={""}
          onChange={handleChange}
        />

        <TextField
          label='Açıklama'
          name='description'
          defaultValue={""}
          onChange={handleChange}
        />
      </FormControl>
    </>
  );
};

interface RedirectionFormProps {
  redirections?: any[];
  onClose: () => void;
}

export const RedirectionForm: React.FC<RedirectionFormProps> = ({
  redirections = [],
  onClose,
}) => {
  const [form, setForm] = useState<any>({
    sourceUrl: "",
    targetUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const { setValue } = useGridContext();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      form.sourceUrl === "" ||
      form.targetUrl === "" ||
      redirections.some((r) => r.sourceUrl === form.sourceUrl)
    ) {
      return;
    }
    const result = null; //await addRedirection(form.sourceUrl, form.targetUrl);
    if (!!result) {
      setValue((prev) => [...prev, result]);
      onClose();
      //window.location.reload();
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
            sx={{ bgcolor: "error.main", color: "#fff" }}
          >
            {"Vazgeç"}
          </Button>
          <Button
            variant='contained'
            onClick={handleSubmit}
            sx={{ bgcolor: "success.main", color: "#fff" }}
            disabled={loading}
          >
            {!loading ? (
              <>{"Kaydet"}</>
            ) : (
              <CircularProgress sx={{ color: "#fff", fontSize: 20 }} />
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
          label='Kaynak Url'
          fullWidth
          name='sourceUrl'
          value={form.sourceUrl}
          onChange={handleChange}
          /* disabled={!edit}
          error={slugError}
          helperText={slugError && "Url dizini biricik olmalı."} */
          FormHelperTextProps={{
            sx: {
              pt: 0.5,
              pb: 0.8,
            },
          }}
        />

        <TextField
          label='Hedef Url'
          name='targetUrl'
          value={form.targetUrl}
          onChange={handleChange}
        />
      </FormControl>
    </>
  );
};
