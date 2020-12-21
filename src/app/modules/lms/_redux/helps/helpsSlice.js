import { createSlice } from "@reduxjs/toolkit";

const initialHelpsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  helpForEdit: undefined,
  lastError: null,
  selectedHelp: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const helpsSlice = createSlice({
  name: "helps",
  initialState: initialHelpsState,
  reducers: {
    setHelp: (state, action) => {
      state.selectedHelp = action.payload;
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
    // getHelpById
    helpFetched: (state, action) => {
      state.actionsLoading = false;
      state.helpForEdit = action.payload.helpForEdit;
      state.error = null;
    },
    helpsAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },
    // findHelps
    helpsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createHelp
    helpCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities = [...state.entities, action.payload.help];
    },
    // updateHelp
    helpUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.help.Id) {
          return action.payload.help;
        }
        return entity;
      });
    },
    // deleteHelp
    helpDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteHelps
    helpsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // helpsUpdateState
    helpsStatusUpdated: (state, action) => {
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
