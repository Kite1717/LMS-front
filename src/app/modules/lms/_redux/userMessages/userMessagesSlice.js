import { createSlice } from "@reduxjs/toolkit";

const initialUserMessagesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  userMessageForEdit: undefined,
  lastError: null,
  selectedUserMessage: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const userMessagesSlice = createSlice({
  name: "userMessages",
  initialState: initialUserMessagesState,
  reducers: {
    setUserMessage: (state, action) => {
      state.selectedUserMessage = action.payload;
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
    // getUserMessageById
    userMessageFetched: (state, action) => {
      state.actionsLoading = false;
      state.userMessageForEdit = action.payload.userMessageForEdit;
      state.error = null;
    },
    userMessagesAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },

    // findUserMessages
    userMessagesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createUserMessage
    userMessageCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities = [...state.entities, action.payload.userMessage];
    },
    // updateUserMessage
    userMessageUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.userMessage.Id) {
          return action.payload.userMessage;
        }
        return entity;
      });
    },
    // deleteUserMessage
    userMessageDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteUserMessages
    userMessagesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // userMessagesUpdateState
    userMessagesStatusUpdated: (state, action) => {
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
