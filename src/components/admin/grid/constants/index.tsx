import { LectureEntity } from "@/types";
import { turkcetarih_formati } from "@/utils";
import {
  PendingRounded,
  VerifiedRounded,
  LinkRounded,
} from "@mui/icons-material";
import { Box, Button, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

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
    //return params.value === 1 ? <VerifiedRounded /> : <PendingRounded />;
  },
};

export const idColumnDef: GridColDef = {
  field: "id",
  headerName: "ID",
  width: 70,
  disableColumnMenu: true,
};

export const categoryColDef: GridColDef = {
  field: "category_id",
  headerName: "Kategori",
  width: 140,

  renderCell: (params) => (
    // Optionally customize the cell rendering
    <>{params.value}</>
  ),
  editable: true,
  type: "singleSelect",
  //valueOptions: categories.map((c) => c.name),
};

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
  idColumnDef,
  {
    field: "title",
    headerName: "Başlık",
    width: 140,
    //valueGetter: (e: LectureEntity) => e.title,
    editable: true,
  },
  { field: "name", headerName: "Ad", width: 200, editable: true },

  { field: "description", headerName: "Açıklama", width: 180, editable: true },
  {
    field: "introThumbnail",
    headerName: "Giriş Resmi",
    width: 150,
    editable: true,
  },
  {
    field: "introUrl",
    headerName: "Giriş Videosu",
    width: 150,
    editable: true,
  },
  {
    field: "videoThumbnail",
    headerName: "Video Resmi",
    width: 150,
    editable: true,
  },
  {
    field: "videoUrl",
    headerName: "Eğitim Videosu",
    width: 150,
    editable: true,
  },
  { field: "price", headerName: "Fiyat", width: 160, editable: true },
  //{ field: "category_id", headerName: "Kat ID", width: 100 },

  /* { field: "question_id", headerName: "Soru ID", width: 100 },
  {
    field: "date_time",
    headerName: "Oluşturulma Tarihi",
    width: 260,
    type: "dateTime",
    //valueGetter: (value: any) => turkcetarih_formati("j F Y l", value),
    valueFormatter: (value: any) => turkcetarih_formati("j F Y l", value),
    //editable: false,
  }, */
];

export const soruColumns: GridColDef[] = [
  {
    field: "slug",
    headerName: "Sayfa",
    width: 60,
    resizable: false,
    filterable: false,
    //hideable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
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
            href={`/sorular/${params.row.category?.slug}/${params.value}`}
          >
            <LinkRounded sx={{ color: "cyan", fontSize: 21 }} />
          </Button>
        </>
      );
    },
  },
  statusColumnDef,
  idColumnDef,
  categoryColDef,

  { field: "title", headerName: "Başlık", width: 240, editable: true },
  { field: "detail", headerName: "Detay", width: 240, editable: true },

  { field: "full_name", headerName: "Ad Soyad", width: 150, editable: true },
  { field: "email", headerName: "Eposta", width: 150, editable: true },
  { field: "phone", headerName: "Telefon", width: 120, editable: true },
  {
    field: "date_time",
    headerName: "Oluşturulma Tarihi",
    width: 260,
    //valueGetter: (value: any) => turkcetarih_formati("j F Y l", value),
    valueFormatter: (value: any) => turkcetarih_formati("j F Y l", value),
    //editable: false,
  },

  //{ field: "category_id", headerName: "Kat ID", width: 80 },
  //{ field: "slug", headerName: "Url Dizini", width: 200, editable: true },
];

export const kategoriColumns: GridColDef[] = [
  statusColumnDef,
  idColumnDef,
  { field: "name", headerName: "Kategori Adı", width: 200, editable: true },
  {
    field: "description",
    headerName: "Açıklama",
    width: 400,
    editable: true,
  },
  { field: "slug", headerName: "Url Dizini", width: 200, editable: true },
  { field: "image", headerName: "Kategori Resmi", width: 200, editable: true },
];

export const yonlendirmeColumns: GridColDef[] = [
  idColumnDef,
  { field: "sourceUrl", headerName: "Kaynak Url", width: 240, editable: true },
  { field: "targetUrl", headerName: "Hedef Url", width: 240, editable: true },
];

export const urunColumns: GridColDef[] = [
  {
    field: "slug",
    headerName: "Sayfa",
    width: 60,
    resizable: false,
    filterable: false,
    //hideable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
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
            href={`/urunler/${params.value}`}
            disabled={params.row.status === 0}
          >
            <LinkRounded sx={{ color: "cyan", fontSize: 21 }} />
          </Button>
        </>
      );
    },
  },
  statusColumnDef,
  idColumnDef,
  { field: "category_name", headerName: "Kategori", width: 200 },
  { field: "name", headerName: "Ürün Adı", width: 640 },
  {
    field: "date_time",
    headerName: "Oluşturulma Tarihi",
    width: 260,
    //valueGetter: (value: any) => turkcetarih_formati("j F Y l", value),
    valueFormatter: (value: any) => turkcetarih_formati("j F Y l", value),
    //editable: false,
  },
];

export const columnsDefinitions: { [key: string]: GridColDef[] } = {
  lectures: lectureColumns,
  sorular: soruColumns,
  kategoriler: kategoriColumns,
  yonlendirmeler: yonlendirmeColumns,
  urunler: urunColumns,
};
