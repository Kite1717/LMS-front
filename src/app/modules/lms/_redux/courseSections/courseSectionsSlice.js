import { createSlice } from "@reduxjs/toolkit";

const initialCourseSectionsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  courseSectionForEdit: undefined,
  lastError: null,
  selectedCourseSection: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const courseSectionsSlice = createSlice({
  name: "courseSections",
  initialState: initialCourseSectionsState,
  reducers: {
    setCourseSection: (state, action) => {
      state.selectedCourseSection = action.payload;
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
    // getCourseSectionById
    courseSectionFetched: (state, action) => {
      state.actionsLoading = false;
      state.courseSectionForEdit = action.payload.courseSectionForEdit;
      state.error = null;
    },
    courseSectionsAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },
    // findCourseSections
    courseSectionsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCourseSection
    courseSectionCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.courseSection);
    },
    // updateCourseSection
    courseSectionUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.courseSection.Id) {
          return action.payload.courseSection;
        }
        return entity;
      });
    },
    // deleteCourseSection
    courseSectionDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteCourseSections
    courseSectionsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // courseSectionsUpdateState
    courseSectionsStatusUpdated: (state, action) => {
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
