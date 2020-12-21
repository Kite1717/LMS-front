import { createSlice } from "@reduxjs/toolkit";

const initialCertificatesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  certificateForEdit: undefined,
  lastError: null,
  selectedCertificate: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const certificatesSlice = createSlice({
  name: "certificates",
  initialState: initialCertificatesState,
  reducers: {
    setCertificate: (state, action) => {
      state.selectedCertificate = action.payload;
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
    // getCertificateById
    certificateFetched: (state, action) => {
      state.actionsLoading = false;
      state.certificateForEdit = action.payload.certificateForEdit;
      state.error = null;
    },
    certificatesAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },

    // findCertificates
    certificatesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCertificate
    certificateCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities = [...state.entities, action.payload.certificate];
    },
    // updateCertificate
    certificateUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.certificate.Id) {
          return action.payload.certificate;
        }
        return entity;
      });
    },
    // deleteCertificate
    certificateDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteCertificates
    certificatesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // certificatesUpdateState
    certificatesStatusUpdated: (state, action) => {
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
