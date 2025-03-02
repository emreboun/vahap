import {
  Box,
  Button,
  ButtonBase,
  Chip,
  Collapse,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
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
import { useState } from "react";
import {
  addLectureResource,
  deleteLectureResource,
  updateLectureResourceContent,
} from "@/api/lectures/resources";
import { GridRowId } from "@mui/x-data-grid";
import { BoxCard } from "@/components/box";
import ButtonBar from "./ButtonBar";
import { useToggle } from "@/hooks/useToggle";
import { useFileUpload } from "@/components/image/hooks";
import { NavLink } from "@/components/app-bar/link";
import { updateLecture } from "@/api/lectures";
import { useRouter } from "next/navigation";

interface Resource {
  name: string;
  content: string;
  type: string;
}

interface EditLectureProps {
  data: any;
}

const EditLecture: React.FC<EditLectureProps> = ({ data }) => {
  //const { value, setValue } = useGridContext();
  const router = useRouter();
  const [lecture, setLecture] = useState<any>(data);

  const {
    id,
    slug,
    name,
    mainVideo,
    introVideo,
    duration,
    description,
    order,
    status,
    resources,
    minElo,
    maxElo,
    //thumbnail,
  } = lecture;

  const onLectureChange = (event: any) => {
    const { name, value, checked } = event.target;
    setLecture((prev: any) => ({
      ...prev,
      [name]: name !== "status" ? value : checked,
    }));
  };

  const [addPgn, setAddPgn] = useState<boolean>(false);
  const [addDisabled, setAddDisabled] = useState<boolean>(true);
  const handleAddDisabled = (name: string) => {
    setAddDisabled(!name || resources.some((res: any) => res.name === name));
  };

  const handleAddPgn = () => {
    setAddPgn((prev) => !prev);
  };

  const [newPgn, setNewPgn] = useState<{ name: string; content: string }>({
    name: "",
    content: "",
  });

  const onNewPgnChange = (event: any) => {
    const { name, value } = event.target;
    setNewPgn((prev) => ({ ...prev, [name]: value }));
    if (name === "name") {
      handleAddDisabled(value);
    }
  };

  const onAddSubmit = async () => {
    const { name, content } = newPgn;
    const result = await addLectureResource(id, {
      name,
      content,
      type: "pgn",
    });

    if (!!result) {
      setLecture((prev: any) => ({
        ...prev,
        resources: [...prev.resources, result],
      }));
      setNewPgn({
        name: "",
        content: "",
      });
      setAddPgn(false);
    }
  };

  const onDeleteSubmit = async (id: string) => {
    try {
      await deleteLectureResource(id);
      setLecture((prev: any) => ({
        ...prev,
        resources: prev.resources.filter((res: any) => res.id !== id),
      }));
    } catch (e) {
      console.error(e);
    }
  };

  const onEditSubmit = async (id: string, content: any) => {
    try {
      const result = await updateLectureResourceContent(id, { content });
      if (!!result) {
        setLecture((prev: any) => ({
          ...prev,
          resources: prev.resources.map((res: any) =>
            res.id !== id ? res : { ...res, content }
          ),
        }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const { selectedFiles, uploadStatus, handleFileChange, uploadFiles } =
    useFileUpload();

  const handleImage = (event?: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event);
  };

  const onUpdateSubmit = async () => {
    const req: any = {
      ...lecture,
    };
    Object.keys(req).forEach((key) => {
      if (req[key] === data[key] || Number(req[key]) === data[key]) {
        req[key] = undefined;
      }
    });
    req.duration = req.duration ? req.duration * 60 : undefined;
    req.minElo = req.minElo ? req.minElo * 1 : undefined;
    req.maxElo = req.maxElo ? req.maxElo * 1 : undefined;

    const result = await updateLecture(id, req);
    let imageResult;
    if (selectedFiles.length > 0 && !!result) {
      imageResult = await uploadFiles(result.id, "lecture");
    } else {
      imageResult = true;
    }

    if (!!result && imageResult) {
      router.push(`/admin/lectures`);
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
        <Typography>{`Eğitimler / ${slug}`}</Typography>

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
            onClick={onUpdateSubmit}
            sx={{
              textTransform: "none",
              minWidth: 82,
              "&:hover": { color: "primary.main", bgcolor: "#fff" },
            }}
            //disabled={loading}
          >
            <>{"Kaydet"}</>
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
            onChange={onLectureChange}
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
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 1.4, md: 1.2, lg: 2 },
          }}
        >
          <TextField
            name={"mainVideo"}
            defaultValue={mainVideo}
            label={"Eğitim Videosu"}
            onChange={onLectureChange}
            sx={{ flex: { xs: 0, md: 1 } }}
          />

          <TextField
            name={"introVideo"}
            defaultValue={introVideo}
            label={"Giriş Videosu"}
            onChange={onLectureChange}
            sx={{ flex: { xs: 0, md: 1 } }}
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
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 0.8, md: 1.2, lg: 2 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: { xs: 0.8, md: 1.2, lg: 2 },
                flex: 1,
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
                <Typography>{status ? "Aktif" : "Pasif"}</Typography>
                <Switch
                  name={"status"}
                  checked={status}
                  sx={{}}
                  onChange={onLectureChange}
                />
              </BoxCard>

              <TextField
                name={"order"}
                defaultValue={order}
                label={"Sıra"}
                sx={{ flex: 1 }}
              />
            </Box>
          </Box>

          <TextField
            name={"duration"}
            defaultValue={duration / 60}
            label={"Süre (dk)"}
            onChange={onLectureChange}
            sx={{ minWidth: { xs: 150, md: 180 }, flex: 1 }}
          />

          <BoxCard
            title={"Seviye Aralığı:"}
            sx={{
              bgcolor: "background.paper",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              py: 0,
              //px: { xs: 2, sm: 3, md: 4 },
              minWidth: { xs: 150, sm: 160, md: 180 },
              minHeight: 56,
            }}
          >
            <TextField
              variant={"standard"}
              name={"minElo"}
              type={"number"}
              sx={{ flex: 1 }}
              defaultValue={minElo}
              onChange={onLectureChange}
            />
            {"-"}
            <TextField
              variant={"standard"}
              name={"maxElo"}
              type={"number"}
              defaultValue={maxElo}
              onChange={onLectureChange}
              sx={{ flex: 1 }}
            />
          </BoxCard>
        </Box>

        <BoxCard
          title={"PGN Dosyaları"}
          sx={{ bgcolor: "background.paper", pt: 3 }}
        >
          {!addPgn ? (
            <Button
              variant={"contained"}
              sx={{
                textTransform: "none",
                fontWeight: 550,
                letterSpacing: 0,
                minWidth: 140,
                ml: 3.6,
              }}
              onClick={handleAddPgn}
            >
              {"Pgn Ekle"}
            </Button>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                px: 3.6,
                width: "100%",
              }}
            >
              <Button
                variant={"contained"}
                color={"secondary"}
                sx={{ textTransform: "none" }}
                onClick={handleAddPgn}
              >
                {"Vazgeç"}
              </Button>

              <Button
                variant={"contained"}
                sx={{ textTransform: "none" }}
                onClick={onAddSubmit}
                disabled={addDisabled}
              >
                {"Dosyayı Kaydet"}
              </Button>
            </Box>
          )}

          <Collapse in={addPgn} sx={{ width: "100%", px: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                px: 1.6,
                pt: 1.2,
                pb: 1.6,
              }}
            >
              <TextField
                defaultValue={newPgn.name}
                name={"name"}
                label={"Dosya Adı"}
                size={"small"}
                onChange={onNewPgnChange}
              />

              <TextField
                defaultValue={newPgn.content}
                name={"content"}
                label={"PGN"}
                multiline
                minRows={2}
                maxRows={8}
                size={"small"}
                onChange={onNewPgnChange}
              />
            </Box>
          </Collapse>

          <List sx={{ py: 0, width: "100%", alignItems: "stretch" }}>
            {resources.map((pgn: any) => (
              <ListItem key={pgn.id} sx={{ width: "100%" }}>
                <PgnItem
                  data={pgn}
                  onDeleteSubmit={onDeleteSubmit}
                  onEditSubmit={onEditSubmit}
                />
              </ListItem>
            ))}
          </List>
        </BoxCard>

        <TextField
          name={"description"}
          defaultValue={description}
          label={"Açıklama"}
          multiline
          minRows={4}
          maxRows={16}
          onChange={onLectureChange}
          sx={{ flex: 1 }}
        />
      </FormControl>
    </>
  );
};

export default EditLecture;

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
