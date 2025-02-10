"use client";

import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";
import { Modal, Paper } from "@mui/material";

import { columnsDefinitions } from "./constants";
import { useState } from "react";
import { CustomToolbar } from "./toolbar";
import { EmptyData } from "./empty";
import { GridProvider, useGridContext } from "./hooks";
import {
  CancelRounded,
  DeleteOutline,
  Description,
  EditRounded,
  SaveRounded,
} from "@mui/icons-material";
import { DeleteForm } from "./form/delete";
import { useParams } from "next/navigation";
import { updateProduct } from "@/api/products";
import { updateLecture } from "@/api/lectures";

interface GridProps {
  type: string;
  data: any[];
}

interface GridCoreProps {
  type: string;
  data: any[];
}

export const Grid: React.FC<GridProps> = ({ type, data }) => {
  return (
    <GridProvider data={data}>
      <GridCore type={type} data={data}></GridCore>
    </GridProvider>
  );
};

export const GridCore: React.FC<GridCoreProps> = ({ type, data }) => {
  const { table } = useParams();

  const [deleteSelected, setDeleteSelected] = useState<GridRowId | null>(null);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  //const [modal, setModal] = useState(false);

  const { value, setValue } = useGridContext();
  //console.log(value);
  /* useEffect(() => {
    setValue(data);
  }, [data, setValue]); */

  /* const handleModal = () => {
    setModal((prev) => !prev);
  }; */

  /* const isEditable = (params: any) => {
    return false;
  }; */

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = (id: GridRowId | null) => () => {
    setDeleteSelected(id);
    //setValue((prev) => prev.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = value.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setValue((prev) => prev.filter((row) => row.id !== id));
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    try {
      const result = await handleSubmit(newRow);
      if (!!result) {
        const updatedRow = { ...newRow, isNew: false };

        setValue((prev) =>
          prev.map((row) => (row.id === newRow.id ? updatedRow : row))
        );
        return updatedRow;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (value: any) => {
    const {
      id,
      name,
      description,
      mainVideo,
      mainThumbnail,
      introVideo,
      introThumbnail,
      price,
      status,
    } = value;
    const req: any = {
      name,
      description,
      mainVideo,
      mainThumbnail,
      introVideo,
      introThumbnail,
      price,
      status,
    };
    const existingItem = data.find((item) => item.id === id);
    Object.keys(req).forEach((key) => {
      if (req[key] === existingItem[key]) {
        req[key] = undefined;
      }
    });

    try {
      let result;
      switch (table) {
        case "lectures":
          result = await updateLecture(id, req);
          console.log(result);
          break;
        case "products":
          result = await updateProduct(id, req);
          break;
      }
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const editFieldColDef: GridColDef = {
    field: "actions",
    headerName: "Düzenle",
    type: "actions",
    cellClassName: "actions",
    width: 90,
    resizable: false,
    filterable: false,
    getActions: (item) => {
      const { id } = item;
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            key='cancel'
            icon={<CancelRounded sx={{ fontSize: 22 }} />}
            label='Cancel'
            className='textPrimary'
            onClick={handleCancelClick(id)}
            color='inherit'
            sx={{ ml: "5px" }}
          />,
          <GridActionsCellItem
            key='save'
            icon={<SaveRounded sx={{ fontSize: 22 }} />}
            label='Save'
            sx={{
              color: "primary.main",
              ml: "5px",
            }}
            onClick={handleSaveClick(id)}
          />,
        ];
      } else {
        return [
          <GridActionsCellItem
            key='edit'
            icon={<EditRounded sx={{ color: "warning.main", fontSize: 22 }} />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
            sx={{ ml: "5px" }}
          />,
          <GridActionsCellItem
            key='delete'
            icon={<DeleteOutline sx={{ color: "error.main", fontSize: 22 }} />}
            label='Delete'
            onClick={handleDeleteClick(id)}
            color='inherit'
            sx={{
              ml: "5px",
            }}
          />,
        ];
      }
    },
  };

  const resultColDef = [editFieldColDef, ...columnsDefinitions[type]];

  return (
    <>
      <Paper
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          boxShadow: 4,
        }}
      >
        <DataGrid
          style={{
            height: "100%",
            width: "100%",
          }}
          rows={value}
          columns={resultColDef}
          hideFooterSelectedRowCount
          slots={{
            noRowsOverlay: EmptyData,
            toolbar: () => <CustomToolbar data={data} />,
          }}
          slotProps={{
            /* root: {
              style: {
                backgroundColor: "red",
                height: "100%",
                minHeight: "100%",
              },
            }, */
            toolbar: {
              style: {
                display: "flex",
                justifyContent: "space-between",
                padding: "4px 8px",
                alignItems: "center",
              },
            },
          }}
          getRowId={(row) => row.id}
          editMode={"row"}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={(e) => console.log(e)}
          onRowDoubleClick={() => {}}
          onCellDoubleClick={() => {}}
          localeText={{
            toolbarColumns: "Sütunlar",
            columnsManagementSearchTitle: "Ara",
            columnsManagementShowHideAllText: "Göster/Gizle Hepsi",

            toolbarFilters: "Filtrele",
            filterPanelDeleteIconLabel: "Kapat",
            filterPanelColumns: "Sütun",
            filterPanelOperator: "İşlem",
            filterValueAny: "asd",
            filterValueTrue: "asd",
            filterValueFalse: "asd",
            filterPanelInputLabel: "Değer",
            filterPanelInputPlaceholder: "Değer Giriniz",
            filterOperatorContains: "içerir",
            filterOperatorEquals: "eşittir",
            filterOperatorStartsWith: "başlar",
            filterOperatorEndsWith: "biter",
            filterOperatorIsEmpty: "boş",
            filterOperatorIsNotEmpty: "boş değil",
            filterOperatorIsAnyOf: "herhangi biri",

            toolbarDensity: "Görünüm",
            toolbarDensityCompact: "Kompakt",
            toolbarDensityStandard: "Standart",
            toolbarDensityComfortable: "Geniş",

            toolbarExport: "Dışa Aktar",
            toolbarExportCSV: "CSV olarak indir",
            toolbarExportPrint: "Yazdır",

            columnMenuLabel: "Menü",
            columnMenuFilter: "Filtrele",
            columnMenuSortAsc: "Sırala Artan",
            columnMenuSortDesc: "Sırala Azalan",
            columnMenuHideColumn: "Sütunu Gizle",
            columnMenuManageColumns: "Sütunları Yönet",

            MuiTablePagination: {
              labelRowsPerPage: "Sayfada Göster",
            },
            columnsManagementReset: "Sıfırla",
          }}
        />

        <Modal open={!!deleteSelected} onClose={() => setDeleteSelected(null)}>
          <Paper
            sx={{
              position: "fixed",
              top: { xs: "60%", sm: "50%" },
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: { xs: "100%", sm: "100%", md: "500px" },
              //height: { xs: "100%", md: "auto" },
            }}
          >
            {!!deleteSelected && (
              <DeleteForm
                itemId={deleteSelected}
                onClose={() => setDeleteSelected(null)}
              />
            )}
          </Paper>
        </Modal>
      </Paper>
    </>
  );
};
