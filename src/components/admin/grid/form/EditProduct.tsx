import {
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Collapse,
  FormControl,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { AddPhotoAlternateOutlined as ImageIcon } from "@mui/icons-material";
import { useCallback, useState } from "react";

import { BoxCard } from "@/components/box";
import ButtonBar from "./ButtonBar";
import { useToggle } from "@/hooks/useToggle";
import { useFileUpload } from "@/components/image/hooks";
import { NavLink } from "@/components/app-bar/link";
import { updateProduct } from "@/api/products";
import { useRouter } from "next/navigation";
import { GridItemCore } from "@/components/grid/GridItem";
import { formatDuration } from "@/utils/data";
import { SearchBar } from "@/components/search/SearchBar";
import { searchLectures } from "@/api/lectures";

interface Resource {
  name: string;
  content: string;
  type: string;
}

interface EditProductProps {
  data: any;
}

const EditProduct: React.FC<EditProductProps> = ({ data }) => {
  const router = useRouter();
  const [product, setProduct] = useState<any>(data);
  const [loading, setLoading] = useState(false);

  const {
    id,
    slug,
    name,
    description,

    lecture,
    order,
    status,
  } = product;

  const onProductChange = (event: any) => {
    const { name, value, checked } = event.target;
    setProduct((prev: any) => ({
      ...prev,
      [name]: name !== "status" ? value : checked,
    }));
  };

  const { selectedFiles, uploadStatus, handleFileChange, uploadFiles } =
    useFileUpload();

  const handleImage = (event?: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event);
  };

  const onUpdateSubmit = async () => {
    const req: any = {
      ...product,
    };
    Object.keys(req).forEach((key) => {
      if (req[key] === data[key]) {
        delete req[key];
        //req[key] = undefined;
      }
    });
    req.price = req.price ? req.price * 1 : undefined;
    req.discount = req.discount ? req.discount * 1 : undefined;

    const result = await updateProduct(id, req);
    let imageResult;
    if (selectedFiles.length > 0 && !!result) {
      imageResult = await uploadFiles(result.id, "product");
    } else {
      imageResult = true;
    }

    if (!!result && imageResult) {
      router.push(`/admin/products`);
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
        <Typography variant={"h6"}>{`Ürünler - ${slug}`}</Typography>

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
            onClick={onUpdateSubmit}
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
        component='form'
        sx={{
          p: "32px 24px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row-reverse" },
            gap: { xs: 1.4, md: 1.2, lg: 2 },
          }}
        >
          <TextField
            name={"name"}
            defaultValue={name}
            label={"Başlık"}
            onChange={onProductChange}
            sx={{ flex: 1 }}
          />

          <Box
            sx={{
              position: "relative",
              width: "100%",
              mb: 0.2,
              flex: 1,
            }}
          >
            <Box
              sx={{
                width: "100%",
                position: "relative",
                display: "flex",
                alignItems: "center",
                border: "1px solid",
                //borderColor: errors.includes("image") ? "error.main" : "divider",
                bgcolor: "background.paper",
                minHeight: 54,
                px: 1.6,
              }}
            >
              <Typography sx={{}}>
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
                    pr: 1.5,
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  <ImageIcon sx={{ fontSize: 32 }} />
                </ButtonBase>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 0.8, md: 1.2, lg: 2 },
          }}
        >
          <Box
            sx={{ display: "flex", gap: { xs: 0.8, md: 1.2, lg: 2 }, flex: 2 }}
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
              <Typography>{status ? "Aktif" : "Pasif"}</Typography>
              <Switch
                name={"status"}
                checked={status}
                sx={{}}
                onChange={onProductChange}
              />
            </BoxCard>

            <TextField
              name={"order"}
              defaultValue={order}
              label={"Sıra"}
              sx={{ flex: 1 }}
            />
          </Box>

          <TextField
            name={"price"}
            label={"Ücret"}
            defaultValue={data.price}
            onChange={onProductChange}
            sx={{ minWidth: { xs: 150, md: 180 }, flex: 1 }}
          />
          <TextField
            name={"discount"}
            label={"İndirim"}
            type={"number"}
            defaultValue={data.discount}
            sx={{ flex: 1 }}
            onChange={onProductChange}
          />
        </Box>

        {!!lecture && (
          <BoxCard title={"Eğitim"} sx={{ bgcolor: "background.paper" }}>
            <Box sx={{ transform: "scale(90%)" }}>
              <List>
                <ListItem>
                  <Typography sx={{ minWidth: { xs: 160 } }}>
                    {lecture.name}
                  </Typography>
                  <Typography sx={{ minWidth: { xs: 160 } }}>
                    {formatDuration(lecture.duration)}
                  </Typography>
                </ListItem>
              </List>
            </Box>
          </BoxCard>
        )}

        {!lecture && (
          <BoxCard title={"Eğitimler"} sx={{ bgcolor: "background.paper" }}>
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
                {data.lectures?.map((item: any) => (
                  <ListItem key={item.id}>
                    <Typography sx={{ minWidth: { xs: 320 }, flex: 1 }}>
                      {item.lecture.name}
                    </Typography>
                    <Typography sx={{ minWidth: { xs: 160 } }}>
                      {formatDuration(item.lecture.duration)}
                    </Typography>
                    <Typography sx={{ minWidth: { xs: 160 } }}>
                      {`${item.lecture.minElo}-${item.lecture.maxElo}`}
                    </Typography>
                  </ListItem>
                ))}
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
        )}

        <TextField
          name={"description"}
          defaultValue={description}
          label={"Açıklama"}
          multiline
          minRows={4}
          onChange={onProductChange}
          sx={{ flex: 1 }}
        />
      </FormControl>
    </>
  );
};

export default EditProduct;

const PgnItem: React.FC<{
  data: any;
  onDeleteSubmit: (id: string) => void;
  onEditSubmit: (id: string, value: string) => void;
}> = ({ data, onDeleteSubmit, onEditSubmit }) => {
  const { id, name, content } = data;

  const [edit, toggleEdit, setEdit] = useToggle();
  const [del, toggleDel] = useToggle();

  const [contentData, setContent] = useState<string>(content);

  const onChange = (event: any) => {
    const { value } = event.target;
    setContent(value);
  };

  const handleSubmit = async () => {
    if (del) {
      onDeleteSubmit(id);
    } else if (edit) {
      onEditSubmit(id, contentData);
      setEdit(false);
    }
  };

  return (
    <Paper
      sx={{ display: "flex", flexDirection: "column", width: "100%" }}
      elevation={!edit ? 0 : 4}
    >
      <Box sx={{ display: "flex", alignItems: "center", pl: 2 }}>
        <Typography>{name}</Typography>
        <ButtonBar
          edit={edit}
          del={del}
          toggleDel={toggleDel}
          toggleEdit={toggleEdit}
          onSubmit={handleSubmit}
        />
      </Box>

      <Collapse in={edit} sx={{ px: 1.4 }}>
        <TextField
          variant={"standard"}
          multiline
          minRows={2}
          maxRows={8}
          fullWidth
          defaultValue={contentData}
          onChange={onChange}
        />
      </Collapse>
    </Paper>
  );
};
