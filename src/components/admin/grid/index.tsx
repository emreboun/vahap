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
  EditRounded,
  SaveRounded,
} from "@mui/icons-material";
import { DeleteForm } from "./form/delete";
import { useParams, useRouter } from "next/navigation";
import { updateProduct } from "@/api/products";
import { updateLecture } from "@/api/lectures";
import { useEventListener } from "@/hooks/useEventListener";
import { updateTicket } from "@/api/products/tickets";

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
  const router = useRouter();
  const [deleteSelected, setDeleteSelected] = useState<GridRowId | null>(null);
  //const [editSelected, setEditSelected] = useState<GridRowId | null>(null);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const { value, setValue } = useGridContext();

  const handleEditClick = (id: GridRowId) => () => {
    if (table === "products") {
      router.push(`/admin/products/edit/${id}`);

      //setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    } else if (table === "users") {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    } else if (table === "lectures") {
      router.push(`/admin/lectures/edit/${id}`);
      //setEditSelected(id);
    } else if (table === "tickets") {
    }
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
      //console.log(newRow);
      const result = await handleSubmit(newRow);
      //console.log(result);
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
    try {
      const {
        id,
        name,
        description,
        mainVideo,
        thumbnail,
        introVideo,
        price,
        status,
        order,
        imgUrl,
        discount,
        //
        date,
        url,
        location,
        capacity,
        sold,
      } = value;
      let result;
      let req: any;
      let existingItem: any;
      switch (table) {
        case "lectures":
          req = {
            name,
            description,
            mainVideo,
            thumbnail,
            introVideo,
            price,
            status,
            order: Number(order),
          };
          existingItem = data.find((item) => item.id === id);
          Object.keys(req).forEach((key) => {
            if (req[key] === existingItem[key]) {
              req[key] = undefined;
            }
          });
          result = await updateLecture(id, req);
          break;
        case "products":
          req = {
            name,
            price,
            imgUrl,
            discount,
          };
          existingItem = data.find((item) => item.id === id);
          Object.keys(req).forEach((key) => {
            if (req[key] === existingItem[key]) {
              req[key] = undefined;
            }
          });
          result = await updateProduct(id, req);
          break;

        case "tickets":
          req = {
            name,
            date,
            url,
            location,
            capacity,
            sold,
          };
          existingItem = data.find((item) => item.id === id);
          Object.keys(req).forEach((key) => {
            if (req[key] === existingItem[key]) {
              req[key] = undefined;
            }
          });
          result = await updateTicket(id, req);
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

  useEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const isInEditMode = Object.values(rowModesModel).some(
        (rowMode) => rowMode.mode === GridRowModes.Edit
      );

      if (isInEditMode) {
        setRowModesModel({});
      }
    }
    /* if (e.key === "Enter") {
      console.log("Enter");
      e.preventDefault();
      return null;
    } */
  });

  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal((prev) => !prev);
  };

  return (
    <>
      <Paper
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          boxShadow: 4,
          //bgcolor: "primary.main",
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
          //onProcessRowUpdateError={(e) => console.log(e)}
          //onRowDoubleClick={() => {}}
          //onCellDoubleClick={() => {}}
          /* onCellEditStop={(params, event) => {
            if (params.reason !== GridCellEditStopReasons.enterKeyDown) {
              return;
            }
            if (isKeyboardEvent(event) && !event.ctrlKey && !event.metaKey) {
              event.defaultPrevented = true;
            }
          }} */
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

        {/* <Modal open={!!editSelected} onClose={() => setEditSelected(null)}>
          <Paper
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: { xs: "100%", sm: "100%", md: "500px" },
              height: { xs: "100%", md: "auto" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            {table === "lectures" && (
              <EditLecture
                id={editSelected}
                //lecture={editSelected}
                onClose={() => setEditSelected(null)}
                onSubmit={handleSubmit}
              />
            )}
         
          </Paper>
        </Modal> */}
      </Paper>
    </>
  );
};
