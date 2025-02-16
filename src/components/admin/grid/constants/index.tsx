import { turkcetarih_formati } from "@/utils";
import { formatDuration } from "@/utils/data";
import {
  PendingRounded,
  VerifiedRounded,
  LinkRounded,
} from "@mui/icons-material";
import { Box, Button, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { use } from "react";

export const statusColumnDef: GridColDef = {
  field: "status",
  headerName: "Durum",
  width: 64,
  resizable: false,
  disableColumnMenu: true,
  sortable: false,
  editable: true,
  type: "singleSelect",
  valueOptions: [false, true].map((c) => ({
    value: c,
    label: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100%",
          pl: "4px",
        }}
      >
        {!c ? (
          <Tooltip title='Onay Bekliyor'>
            <PendingRounded sx={{ color: "warning.main", fontSize: 22 }} />
          </Tooltip>
        ) : (
          <Tooltip title='Onaylı'>
            <VerifiedRounded sx={{ color: "success.main", fontSize: 22 }} />
          </Tooltip>
        )}
      </Box>
    ),
  })),
  renderCell: (params) => {
    if (!params.value) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "100%",
            pl: "4px",
          }}
        >
          <Tooltip title='Onay Bekliyor'>
            <PendingRounded sx={{ color: "warning.main", fontSize: 22 }} />
          </Tooltip>
        </Box>
      );
    } else if (params.value) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "100%",
            pl: "4px",
          }}
        >
          <Tooltip title='Onaylı'>
            <VerifiedRounded sx={{ color: "success.main", fontSize: 22 }} />
          </Tooltip>
        </Box>
      );
    } else {
      return params.value;
    }
  },
};

export const idColumnDef: GridColDef = {
  field: "id",
  headerName: "",
  width: 1,
  minWidth: 1,
  maxWidth: 1,
  disableColumnMenu: true,
  disableExport: true,
  disableReorder: true,
  sortable: false,
  renderCell: () => <span />,
};

export const userColumns: GridColDef[] = [
  {
    field: "email",
    headerName: "E-posta",
    width: 280,
    editable: true,
  },
  {
    field: "firstName",
    headerName: "Ad",
    width: 200,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Soyad",
    width: 200,
    editable: true,
  },
  {
    field: "phone",
    headerName: "Telefon",
    width: 200,
    editable: true,
  },
  {
    field: "createdAt",
    headerName: "Kayıt Tarihi",
    width: 260,
    type: "dateTime",
    valueFormatter: (value: any) => turkcetarih_formati("j F Y l", value),
  },
];

export const lectureColumns: GridColDef[] = [
  {
    field: "slug",
    headerName: "Sayfa",
    width: 60,
    resizable: false,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    hideSortIcons: true,
    renderCell: (params) => {
      return (
        <>
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
              ml: "-12px",
            }}
            target='_blank'
            rel='noopener noreferrer'
            href={`/egitimler/${params.value}`}
          >
            <LinkRounded sx={{ color: "cyan", fontSize: 21 }} />
          </Button>
        </>
      );
    },
  },
  statusColumnDef,
  //idColumnDef,
  {
    field: "name",
    headerName: "Başlık",
    width: 240,
    editable: true,
  },
  {
    field: "description",
    headerName: "Açıklama",
    preProcessEditCellProps(params) {
      return {
        ...params.props,
        multiline: true,
        maxRows: 2,
        onKeyDown: (e: any) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.stopPropagation(); // Prevent row submission
            // e.preventDefault(); // Prevent line break
          }
        },
      };
    },
    width: 240,
    editable: true,
  },
  {
    field: "introThumbnail",
    headerName: "Giriş Resmi",

    width: 200,
    editable: true,
  },
  {
    field: "introVideo",
    headerName: "Giriş Videosu",
    width: 200,
    editable: true,
  },
  {
    field: "mainThumbnail",
    headerName: "Video Resmi",
    width: 200,
    editable: true,
  },
  {
    field: "mainVideo",
    headerName: "Eğitim Videosu",
    width: 320,
    editable: true,
  },
  {
    field: "duration",
    headerName: "Eğitim Süresi",
    width: 320,
    valueFormatter: (value) => formatDuration(value),
  },
  {
    field: "order",
    headerName: "Sıra",
    width: 100,
    type: "number",
    editable: true,
  },
  /* {
    field: "mainPassword",
    headerName: "Video Şifresi",
    width: 240,
    editable: true,
  }, */
  //{ field: "price", headerName: "Fiyat", width: 160, editable: true },
  //{ field: "category_id", headerName: "Kat ID", width: 100 },

  /* { field: "question_id", headerName: "Soru ID", width: 100 }, */
  {
    field: "createdAt",
    headerName: "Oluşturulma Tarihi",
    width: 260,
    type: "dateTime",
    valueFormatter: (value: any) => turkcetarih_formati("j F Y l", value),
  },
];

const productColumns: GridColDef[] = [
  {
    field: "slug",
    headerName: "Sayfa",
    width: 60,
    resizable: false,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    hideSortIcons: true,
    renderCell: (params) => {
      return (
        <>
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
              ml: "-12px",
            }}
            target='_blank'
            rel='noopener noreferrer'
            href={`/egitimler/${params.value}`}
          >
            <LinkRounded sx={{ color: "cyan", fontSize: 21 }} />
          </Button>
        </>
      );
    },
  },
  statusColumnDef,
  //idColumnDef,
  {
    field: "name",
    headerName: "Başlık",
    width: 320,
    //valueGetter: (e: LectureEntity) => e.title,
    editable: true,
  },
  {
    field: "price",
    headerName: "Fiyat",
    type: "number",
    width: 160,
    editable: true,
  },
  {
    field: "imgUrl",
    headerName: "Resim Dizini",
    width: 240,
    editable: true,
  },
];

export const columnsDefinitions: { [key: string]: GridColDef[] } = {
  lectures: lectureColumns,
  products: productColumns,
  users: userColumns,
};
