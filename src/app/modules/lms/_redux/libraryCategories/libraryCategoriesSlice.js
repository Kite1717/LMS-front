import { createSlice } from "@reduxjs/toolkit";

const initialLibraryCategoriesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  libraryCategoryForEdit: undefined,
  lastError: null,
  selectedLibraryCategory: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const libraryCategoriesSlice = createSlice({
  name: "libraryCategories",
  initialState: initialLibraryCategoriesState,
  reducers: {
    setLibraryCategory: (state, action) => {
      state.selectedLibraryCategory = action.payload;
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
    // getLibraryCategoryById
    libraryCategoryFetched: (state, action) => {
      state.actionsLoading = false;
      state.libraryCategoryForEdit = action.payload.libraryCategoryForEdit;
      state.error = null;
    },
    libraryCategoriesAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },
    // findLibraryCategories
    libraryCategoriesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createLibraryCategory
    libraryCategoryCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities = [...state.entities, action.payload.libraryCategory];
    },
    // updateLibraryCategory
    libraryCategoryUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.libraryCategory.Id) {
          return action.payload.libraryCategory;
        }
        return entity;
      });
    },

    libraryCategoriesTagsFetched: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = data;
    },
    // deleteLibraryCategory
    libraryCategoryDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteLibraryCategories
    libraryCategoriesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // libraryCategoriesUpdateState
    libraryCategoriesStatusUpdated: (state, action) => {
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
