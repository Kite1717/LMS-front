import { createSlice } from "@reduxjs/toolkit";

const initialQualityDocumentFilesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  qualityDocumentFileForEdit: undefined,
  lastError: null,
  selectedQualityDocumentFile: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const qualityDocumentFilesSlice = createSlice({
  name: "qualityDocumentFiles",
  initialState: initialQualityDocumentFilesState,
  reducers: {
    setQualityDocumentFile: (state, action) => {
      state.selectedQualityDocumentFile = action.payload;
    },
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getQualityDocumentFileById
    qualityDocumentFileFetched: (state, action) => {
      state.actionsLoading = false;
      state.qualityDocumentFileForEdit =
        action.payload.qualityDocumentFileForEdit;
      state.error = null;
    },
    qualityDocumentFilesAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },
    // findQualityDocumentFiles
    qualityDocumentFilesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createQualityDocumentFile
    qualityDocumentFileCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.qualityDocumentFile);
    },
    // updateQualityDocumentFile
    qualityDocumentFileUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.qualityDocumentFile.Id) {
          return action.payload.qualityDocumentFile;
        }
        return entity;
      });
    },
    // deleteQualityDocumentFile
    qualityDocumentFileDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteQualityDocumentFiles
    qualityDocumentFilesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // qualityDocumentFilesUpdateState
    qualityDocumentFilesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
