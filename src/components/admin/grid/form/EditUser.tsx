import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  List,
  ListItem,
  ListItemButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { NavLink } from "@/components/app-bar/link";
import { updateUser } from "@/api/user/account";
import { BoxCard } from "@/components/box";
import { SearchBar } from "@/components/search/SearchBar";
import { searchLectures } from "@/api/lectures";
import { formatDuration } from "@/utils/data";
import { grantUserAccess } from "@/api/lectures/access";
import { VerifiedRounded } from "@mui/icons-material";

interface EditUserFormProps {
  onClose?: () => void;
  data: any;
}

const EditUser: React.FC<EditUserFormProps> = ({ data, onClose }) => {
  const { user, permissions } = data;
  console.log(permissions);
  const router = useRouter();
  const { id } = user;

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

    Object.keys(req).forEach((key) => {
      if (req[key] === user[key]) {
        delete req[key];
      }
    });
    if (lectures.length > 0) {
      const lectureIds = lectures.map((lect) => lect.id);
      const resultAccess = await grantUserAccess(id, lectureIds);
      if (!resultAccess) {
        return;
      }
    }
    const result = await updateUser(id, req);

    if (!!result) {
      router.push(`/admin/users`);
    }
  };

  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [lectures, setLectures] = useState<any[]>(
    [] //permissions.map((perm: any) => perm.lecture)
  );

  const onSearch = useCallback(
    async (text: string) => {
      if (text.length < 3) {
        setSearchResult([]);
      } else {
        const resultList = await searchLectures(text);
        const res = resultList.filter(
          (item) =>
            !permissions.some((perm: any) => perm.lecture.slug === item.slug) &&
            !lectures.some((lect: any) => lect.slug === item.slug)
        );
        setSearchResult(res);
      }
    },
    [permissions, lectures]
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
        <Typography variant={"h6"}>{`Bileti Düzenle`}</Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <NavLink href={`/admin/users`}>
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
            flex: 4,
          }}
        >
          <TextField
            name={"email"}
            label={"E-posta"}
            defaultValue={user.email}
            sx={{ flex: 1 }}
            onChange={handleChange}
          />

          <TextField
            name={"phone"}
            label={"telefon"}
            defaultValue={user.phone}
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
          <TextField
            name={"firstName"}
            label={"İsim"}
            defaultValue={user.firstName}
            onChange={handleChange}
            sx={{ flex: 1 }}
          />

          <TextField
            name={"lastName"}
            label={"Soyisim"}
            onChange={handleChange}
            defaultValue={user.lastName}
            sx={{ flex: 1 }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 0.8, md: 1.2, lg: 2 },
          }}
        >
          <BoxCard
            title={"Eğitim Erişimleri"}
            sx={{ width: "100%", bgcolor: "background.paper" }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
              }}
            >
              <List>
                {permissions.map((perm: any) => (
                  <ListItem key={perm.lecture.slug}>
                    {perm.lecture.name}
                  </ListItem>
                ))}
              </List>

              {lectures.length > 0 && (
                <>
                  <Divider />
                  <List sx={{ py: 0 }}>
                    {lectures.map((lecture: any) => (
                      <ListItem
                        key={lecture.slug}
                        sx={{ color: "secondary.main", gap: 1 }}
                      >
                        <VerifiedRounded />
                        <>{lecture.name}</>
                      </ListItem>
                    ))}
                  </List>
                  <Divider sx={{ mb: 2.2 }} />
                </>
              )}

              <BoxCard title={"Yeni Erişim Ver"}>
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
        </Box>
      </FormControl>
    </>
  );
};
export default EditUser;
