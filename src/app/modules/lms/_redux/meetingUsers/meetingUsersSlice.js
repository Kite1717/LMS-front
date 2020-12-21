import { createSlice } from "@reduxjs/toolkit";

const initialMeetingUsersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  meetingUserForEdit: undefined,
  lastError: null,
  selectedMeetingUser: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const meetingUsersSlice = createSlice({
  name: "meetingUsers",
  initialState: initialMeetingUsersState,
  reducers: {
    setMeetingUser: (state, action) => {
      state.selectedMeetingUser = action.payload;
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
    // getMeetingUserById
    meetingUserFetched: (state, action) => {
      state.actionsLoading = false;
      state.meetingUserForEdit = action.payload.meetingUserForEdit;
      state.error = null;
    },
    meetingUsersAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },

    meetingUsersTagFetchedByTopicId: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },

    // findMeetingUsers
    meetingUsersFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createMeetingUser
    meetingUserCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.meetingUser);
    },
    // updateMeetingUser
    meetingUserUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.meetingUser.Id) {
          return action.payload.meetingUser;
        }
        return entity;
      });
    },
    // deleteMeetingUser
    meetingUserDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteMeetingUsers
    meetingUsersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // meetingUsersUpdateState
    meetingUsersStatusUpdated: (state, action) => {
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
