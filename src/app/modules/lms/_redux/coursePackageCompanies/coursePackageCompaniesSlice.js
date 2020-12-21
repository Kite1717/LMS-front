import { createSlice } from "@reduxjs/toolkit";

const initialCoursePackageCompaniesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  coursePackageCompanyForEdit: undefined,
  coursePackageCompanyForAssign: undefined,
  lastError: null,
  selectedCoursePackageCompany: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const coursePackageCompaniesSlice = createSlice({
  name: "coursePackageCompanies",
  initialState: initialCoursePackageCompaniesState,
  reducers: {
    setCoursePackageCompany: (state, action) => {
      state.selectedCoursePackageCompany = action.payload;
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
    // getCoursePackageCompanyById
    coursePackageCompanyFetched: (state, action) => {
      state.actionsLoading = false;
      state.coursePackageCompanyForEdit =
        action.payload.coursePackageCompanyForEdit;
      state.error = null;
    },
    coursePackageCompaniesAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },
    // findCoursePackageCompanies
    coursePackageCompaniesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCoursePackageCompany
    coursePackageCompanyCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities = [...state.entities, action.payload.coursePackageCompany];
    },
    // updateCoursePackageCompany
    coursePackageCompanyUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.coursePackageCompany.Id) {
          return action.payload.coursePackageCompany;
        }
        return entity;
      });
    },
    // deleteCoursePackageCompany
    coursePackageCompanyDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteCoursePackageCompanies
    coursePackageCompaniesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // coursePackageCompaniesUpdateState
    coursePackageCompaniesStatusUpdated: (state, action) => {
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
