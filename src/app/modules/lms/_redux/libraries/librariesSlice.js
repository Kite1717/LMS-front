import { createSlice } from "@reduxjs/toolkit";

const initialLibrariesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  libraryForEdit: undefined,
  lastError: null,
  selectedLibrary: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const librariesSlice = createSlice({
  name: "libraries",
  initialState: initialLibrariesState,
  reducers: {
    setLibrary: (state, action) => {
      state.selectedLibrary = action.payload;
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
    // getLibraryById
    libraryFetched: (state, action) => {
      state.actionsLoading = false;
      state.libraryForEdit = action.payload.libraryForEdit;
      state.error = null;
    },
    librariesAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },
    // findLibraries
    librariesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createLibrary
    libraryCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities = [...state.entities, action.payload.library];
    },
    // updateLibrary
    libraryUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.library.Id) {
          return action.payload.library;
        }
        return entity;
      });
    },
    // deleteLibrary
    libraryDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteLibraries
    librariesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // librariesUpdateState
    librariesStatusUpdated: (state, action) => {
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
