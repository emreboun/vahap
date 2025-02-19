import { updateLecture } from "@/api/lectures";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useGridContext } from "../hooks";

interface EditLectureProps {
  lecture: any;
  onClose: () => void;
  onSubmit: (value: any) => void;
}

const EditLecture: React.FC<EditLectureProps> = ({
  lecture,
  onClose,
  onSubmit,
}) => {
  const {
    id,
    name,
    mainVideo,
    introVideo,
    duration,
    misc,
    description,
    order,
    status,
  } = lecture;

  const { value, setValue } = useGridContext();

  const [addPgn, setAddPgn] = useState<boolean>(false);
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
  };

  const onAddSubmit = async () => {
    //const result = onSubmit();
    const result = await updateLecture(id, {
      misc: { ...misc, pgns: misc?.pgns ? [...misc.pgns, newPgn] : [newPgn] },
    });
    console.log(result);
    if (!!result) {
      setValue((prev) =>
        prev.map((row) =>
          row.id === id
            ? {
                ...row,
                misc: {
                  misc: {
                    ...misc,
                    pgns: misc?.pgns ? [...misc.pgns, newPgn] : [newPgn],
                  },
                },
              }
            : row
        )
      );
      setNewPgn({
        name: "",
        content: "",
      });
      setAddPgn(false);
    }
  };

  const onUpdateSubmit = async () => {
    const req: any = {
      name,
      description,
      mainVideo,
      introVideo,
      status,
      order: Number(order),
    };
    //const existingItem = data.find((item) => item.id === id);
    /* Object.keys(req).forEach((key) => {
      if (req[key] === existingItem[key]) {
        req[key] = undefined;
      }
    }); */
  };

  return (
    <FormControl
      component='form'
      sx={{
        p: "24px 16px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <TextField name={"name"} defaultValue={name} label={"Başlık"} />

      <TextField
        name={"mainVideo"}
        defaultValue={mainVideo}
        label={"Eğitim Videosu"}
      />

      <TextField
        name={"introVideo"}
        defaultValue={introVideo}
        label={"Giriş Videosu"}
      />

      <TextField
        name={"duration"}
        defaultValue={duration}
        label={"Süre (dk)"}
      />

      {!addPgn ? (
        <Button
          variant={"contained"}
          sx={{ textTransform: "none" }}
          onClick={handleAddPgn}
        >
          {"Pgn Ekle"}
        </Button>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
          >
            {"Pgn Kaydet"}
          </Button>
        </Box>
      )}

      {addPgn && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            bgcolor: "background.paper",
            px: 1,
            py: 1.5,
          }}
        >
          <TextField
            defaultValue={newPgn.name}
            name={"name"}
            label={"Yeni Dosya Adı"}
            size={"small"}
            onChange={onNewPgnChange}
          />
          <TextField
            defaultValue={newPgn.content}
            name={"content"}
            label={"Yeni PGN"}
            multiline
            minRows={2}
            maxRows={8}
            size={"small"}
            onChange={onNewPgnChange}
          />
        </Box>
      )}

      {misc?.pgns.map((pgn: any, i: number) => (
        <Box key={i}>
          <Typography>{pgn.name}</Typography>
          {/* <TextField
            defaultValue={pgn.name}
            label={"Dosya Adı"}
            size={"small"}
          />
          <TextField
            defaultValue={pgn.content}
            label={"PGN"}
            multiline
            size={"small"}
          /> */}
        </Box>
      ))}
    </FormControl>
  );
};

export default EditLecture;
