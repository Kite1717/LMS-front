import { createSlice } from "@reduxjs/toolkit";

const initialCourseLibraryCategoriesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  courseLibraryCategoryForEdit: undefined,
  lastError: null,
  selectedCourseLibraryCategory: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const courseLibraryCategoriesSlice = createSlice({
  name: "courseLibraryCategories",
  initialState: initialCourseLibraryCategoriesState,
  reducers: {
    setCourseLibraryCategory: (state, action) => {
      state.selectedCourseLibraryCategory = action.payload;
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
    // getCourseLibraryCategoryById
    courseLibraryCategoryFetched: (state, action) => {
      state.actionsLoading = false;
      state.courseLibraryCategoryForEdit =
        action.payload.courseLibraryCategoryForEdit;
      state.error = null;
    },
    courseLibraryCategoriesAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },
    // findCourseLibraryCategories
    courseLibraryCategoriesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCourseLibraryCategory
    courseLibraryCategoryCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities = [
        ...state.entities,
        action.payload.courseLibraryCategory,
      ];
    },
    // updateCourseLibraryCategory
    courseLibraryCategoryUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.courseLibraryCategory.Id) {
          return action.payload.courseLibraryCategory;
        }
        return entity;
      });
    },

    courseLibraryCategoriesTagsFetched: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = data;
    },
    // deleteCourseLibraryCategory
    courseLibraryCategoryDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteCourseLibraryCategories
    courseLibraryCategoriesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // courseLibraryCategoriesUpdateState
    courseLibraryCategoriesStatusUpdated: (state, action) => {
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
