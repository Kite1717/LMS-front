import { createSlice } from "@reduxjs/toolkit";

const initialCourseUsersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  courseUserForEdit: undefined,
  lastError: null,
  selectedCourseUser: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const courseUsersSlice = createSlice({
  name: "courseUsers",
  initialState: initialCourseUsersState,
  reducers: {
    setCourseUser: (state, action) => {
      state.selectedCourseUser = action.payload;
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
    // getCourseUserById
    courseUserFetched: (state, action) => {
      state.actionsLoading = false;
      state.courseUserForEdit = action.payload.courseUserForEdit;
      state.error = null;
    },
    courseUsersAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },

    courseUsersTagFetchedByTopicId: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },

    // findCourseUsers
    courseUsersFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCourseUser
    courseUserCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.courseUser);
    },
    // updateCourseUser
    courseUserUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.courseUser.Id) {
          return action.payload.courseUser;
        }
        return entity;
      });
    },
    // deleteCourseUser
    courseUserDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteCourseUsers
    courseUsersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // courseUsersUpdateState
    courseUsersStatusUpdated: (state, action) => {
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
