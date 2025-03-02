"use client";
import { updatePage } from "@/api/pages";
import { NavLink } from "@/components/app-bar/link";
import {
  Box,
  Button,
  CircularProgress,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditPageProps {
  data: any;
}

export const EditPage: React.FC<EditPageProps> = ({ data }) => {
  const router = useRouter();
  const { id, slug, title, content, status } = data;
  const [markdown, setMarkdown] = useState(content);
  const [loading, setLoading] = useState(false);

  const onChange = (event: any) => {
    const { name, value } = event.target;
    setMarkdown(value);
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const result = await updatePage(id, { content: markdown });
      if (!!result) {
        router.push("/admin");
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <>
      <Paper
        sx={{
          m: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
        elevation={0}
      >
        <Paper
          sx={{
            px: 2,
            py: 1.5,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>{title}</Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <NavLink href={`/admin`}>
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
              onClick={onSubmit}
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

        <Box
          sx={{
            flex: 1,
            /* display: "flex",
            flexDirection: "column", */
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflowY: "auto",
              pb: 1.6,
            }}
          >
            <InputBase
              multiline
              fullWidth
              defaultValue={content}
              onChange={onChange}
              sx={{
                display: "flex",
                flexDirection: "column",
                py: 0.4,
                px: 0.8,
                minHeight: "100%",
                alignItems: "flex-start",
                "& .MuiInputBase-input": {
                  minHeight: "97%",
                },
              }}
            />
          </Box>
        </Box>
      </Paper>
    </>
  );
};
