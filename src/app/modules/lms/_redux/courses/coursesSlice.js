import { createSlice } from "@reduxjs/toolkit";

const initialCoursesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  courseForEdit: undefined,
  lastError: null,
  selectedCourse: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState: initialCoursesState,
  reducers: {
    setCourse: (state, action) => {
      state.selectedCourse = action.payload;
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
    // getCourseById
    courseFetched: (state, action) => {
      state.actionsLoading = false;
      state.courseForEdit = action.payload.courseForEdit;
      state.error = null;
    },
    coursesAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },
    // findCourses
    coursesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCourse
    courseCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities = [...state.entities, action.payload.course];
    },
    // updateCourse
    courseUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.course.Id) {
          return action.payload.course;
        }
        return entity;
      });
    },
    // deleteCourse
    courseDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteCourses
    coursesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // coursesUpdateState
    coursesStatusUpdated: (state, action) => {
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
