import { createSlice } from "@reduxjs/toolkit";

const initialMeetingsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  meetingForEdit: undefined,
  lastError: null,
  selectedMeeting: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const meetingsSlice = createSlice({
  name: "meetings",
  initialState: initialMeetingsState,
  reducers: {
    setMeeting: (state, action) => {
      state.selectedMeeting = action.payload;
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
    // getMeetingById
    meetingFetched: (state, action) => {
      state.actionsLoading = false;
      state.meetingForEdit = action.payload.meetingForEdit;
      state.error = null;
    },
    meetingsAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },
    // findMeetings
    meetingsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createMeeting
    meetingCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities = [...state.entities, action.payload.meeting];
    },
    // updateMeeting
    meetingUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.meeting.Id) {
          return action.payload.meeting;
        }
        return entity;
      });
    },
    // deleteMeeting
    meetingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteMeetings
    meetingsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // meetingsUpdateState
    meetingsStatusUpdated: (state, action) => {
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
