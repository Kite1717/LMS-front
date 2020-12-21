import { createSlice } from "@reduxjs/toolkit";

const initialCoursePackagesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  coursePackageForEdit: undefined,
  lastError: null,
  selectedCoursePackage: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const coursePackagesSlice = createSlice({
  name: "coursePackages",
  initialState: initialCoursePackagesState,
  reducers: {
    setCoursePackage: (state, action) => {
      state.selectedCoursePackage = action.payload;
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
    // getCoursePackageById
    coursePackageFetched: (state, action) => {
      state.actionsLoading = false;
      state.coursePackageForEdit = action.payload.coursePackageForEdit;
      state.error = null;
    },
    coursePackagesAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },
    // findCoursePackages
    coursePackagesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCoursePackage
    coursePackageCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities = [...state.entities, action.payload.coursePackage];
    },
    // updateCoursePackage
    coursePackageUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.coursePackage.Id) {
          return action.payload.coursePackage;
        }
        return entity;
      });
    },
    // deleteCoursePackage
    coursePackageDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteCoursePackages
    coursePackagesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // coursePackagesUpdateState
    coursePackagesStatusUpdated: (state, action) => {
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
