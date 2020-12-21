import { createSlice } from "@reduxjs/toolkit";

const initialPollsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  pollForEdit: undefined,
  lastError: null,
  selectedPoll: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const pollsSlice = createSlice({
  name: "polls",
  initialState: initialPollsState,
  reducers: {
    setPoll: (state, action) => {
      state.selectedPoll = action.payload;
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
    // getPollById
    pollFetched: (state, action) => {
      state.actionsLoading = false;
      state.pollForEdit = action.payload.pollForEdit;
      state.error = null;
    },
    pollsAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },
    // findPolls
    pollsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPoll
    pollCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities = [...state.entities, action.payload.poll];
    },
    // updatePoll
    pollUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.poll.Id) {
          return action.payload.poll;
        }
        return entity;
      });
    },
    // deletePoll
    pollDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deletePolls
    pollsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // pollsUpdateState
    pollsStatusUpdated: (state, action) => {
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
