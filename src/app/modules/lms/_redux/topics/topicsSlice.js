import { createSlice } from "@reduxjs/toolkit";

const initialTopicsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  topicForEdit: undefined,
  lastError: null,
  selectedTopic: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const topicsSlice = createSlice({
  name: "topics",
  initialState: initialTopicsState,
  reducers: {
    setTopic: (state, action) => {
      state.selectedTopic = action.payload;
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
    // getTopicById
    topicFetched: (state, action) => {
      state.actionsLoading = false;
      state.topicForEdit = action.payload.topicForEdit;
      state.error = null;
    },
    topicsAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },

    topicsFetchedByCourseId: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },

    // findTopics
    topicsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createTopic
    topicCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.topic);
    },
    // updateTopic
    topicUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.topic.Id) {
          return action.payload.topic;
        }
        return entity;
      });
    },
    // deleteTopic
    topicDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteTopics
    topicsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // topicsUpdateState
    topicsStatusUpdated: (state, action) => {
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
