import { createSlice } from "@reduxjs/toolkit";

const initialPollGroupsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  pollGroupForEdit: undefined,
  lastError: null,
  selectedPollGroup: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const pollGroupsSlice = createSlice({
  name: "pollGroups",
  initialState: initialPollGroupsState,
  reducers: {
    setPollGroup: (state, action) => {
      state.selectedPollGroup = action.payload;
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
    // getPollGroupById
    pollGroupFetched: (state, action) => {
      state.actionsLoading = false;
      state.pollGroupForEdit = action.payload.pollGroupForEdit;
      state.error = null;
    },
    pollGroupsAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },

    pollGroupsFetchedByCourseId: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },

    // findPollGroups
    pollGroupsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPollGroup
    pollGroupCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.pollGroup);
    },
    // updatePollGroup
    pollGroupUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.pollGroup.Id) {
          return action.payload.pollGroup;
        }
        return entity;
      });
    },
    // deletePollGroup
    pollGroupDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deletePollGroups
    pollGroupsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // pollGroupsUpdateState
    pollGroupsStatusUpdated: (state, action) => {
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
