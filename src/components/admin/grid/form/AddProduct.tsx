import {
  Box,
  Button,
  ButtonBase,
  CircularProgress,
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
import { createProduct, getProductSlugPrefix } from "@/api/products";
import { NavLink } from "@/components/app-bar/link";
import { useFileUpload } from "@/components/image/hooks";
import { useRouter } from "next/navigation";
import { useDebounceWithTimeout } from "@/hooks/debounce";
import { BoxCard } from "@/components/box";
import { SearchBar } from "@/components/search/SearchBar";
import { searchLectures } from "@/api/lectures";
import { formatDuration } from "@/utils/data";

interface AddProductFormProps {
  onClose?: () => void;
}

const AddProduct: React.FC<AddProductFormProps> = ({ onClose }) => {
  const router = useRouter();

  const [form, setForm] = useState<any>({
    slug: "",
    status: true,
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [slugLoading, setSlugLoading] = useState(false);
  const [slugError, setSlugError] = useState(false);

  const checkSlugUnique = useCallback(async (value: string) => {
    setSlugLoading(true);
    const formatted = formatUrl(value);
    const result = await getProductSlugPrefix(formatted);
    setSlugError(result?.some((r: any) => r.slug === formatted));
    setSlugLoading(false);
  }, []);

  useDebounceWithTimeout(checkSlugUnique, form.slug, 500);

  const handleSlug = async () => {
    setSlugLoading(true);
    const slug = generateUrlSlug(form.name ?? "");

    const result = await getProductSlugPrefix(slug);

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
    setErrors((prev) => prev.filter((p) => p !== name));
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
    const { slug, name, price, discount, description, status } = form;

    try {
      const list = [];
      if (!slug) list.push("slug");
      if (!name) list.push("name");
      if (!price || Number(price) <= 0) list.push("price");
      //if (selectedFiles.length === 0) list.push("image");
      if (lectures.length === 0) list.push("lectures");
      if (list.length > 0 || slugError) {
        setErrors(list);
        return;
      }

      setLoading(true);

      const temp = {
        slug: formatUrl(slug),
        name: formatText(name),
        thumbnail: "",
        price: Number(price),
        discount: discount ? Number(discount) : undefined,
        description: formatText(description),
        status,
        lectures,
      };

      const result = await createProduct({ ...temp });

      let imageResult;
      if (selectedFiles.length > 0 && !!result) {
        imageResult = await uploadFiles(result.id, "product");
      } else {
        imageResult = true;
      }
      setLoading(false);
      if (!!result && !!imageResult) {
        if (!!onClose) {
          onClose();
        } else {
          router.push(`/admin/products`);
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
    setErrors((prev) => prev.filter((p) => p !== "lectures"));
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
        <Typography variant={"h6"}>{`Yeni Ürün`}</Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <NavLink href={`/admin/products`}>
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
                  <CircularProgress sx={{ color: "primary.main" }} size={20} />
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
              borderColor: errors.includes("image") ? "error.main" : "divider",
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
            name={"price"}
            label={"Ücret"}
            type={"number"}
            sx={{ flex: 1 }}
            onChange={handleChange}
            error={errors.includes("price")}
          />

          <TextField
            name={"discount"}
            label={"İndirim"}
            type={"number"}
            sx={{ flex: 1 }}
            onChange={handleChange}
          />
        </Box>

        <BoxCard
          title={"Eğitimler"}
          sx={{
            bgcolor: "background.paper",
            borderColor: errors.includes("lectures") && "error.main",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              px: 1.6,
              pt: 1.2,
              pb: 1.6,
              width: "100%",
            }}
          >
            <List sx={{ py: 0, width: "100%", alignItems: "stretch" }}>
              {lectures.map((item: any) => (
                <ListItem key={item.id}>
                  <Typography sx={{ minWidth: { xs: 160 } }}>
                    {item.name}
                  </Typography>
                  <Typography sx={{ minWidth: { xs: 160 } }}>
                    {formatDuration(item.duration)}
                  </Typography>
                </ListItem>
              ))}
            </List>

            <BoxCard title={"Yeni Eğitim Ekle"}>
              <SearchBar onSearch={onSearch} />
            </BoxCard>

            <List sx={{ py: 0, width: "100%", alignItems: "stretch" }}>
              {searchResult.map((item: any) => (
                <ListItemButton
                  key={item.id}
                  sx={{ width: "100%", display: "flex" }}
                  onClick={() => handleAddLecture(item)}
                >
                  <Typography sx={{ minWidth: { xs: 160 } }}>
                    {item.name}
                  </Typography>
                  <Typography sx={{ minWidth: { xs: 160 } }}>
                    {formatDuration(item.duration)}
                  </Typography>
                  <Typography className={"limitedLine3"}>
                    {item.description}
                  </Typography>
                </ListItemButton>
              ))}
            </List>
          </Box>
        </BoxCard>

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
export default AddProduct;
