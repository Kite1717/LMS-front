import { createSlice } from "@reduxjs/toolkit";

const initialMessagesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  messageForEdit: undefined,
  lastError: null,
  selectedMessage: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState: initialMessagesState,
  reducers: {
    setMessage: (state, action) => {
      state.selectedMessage = action.payload;
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
    // getMessageById
    messageFetched: (state, action) => {
      state.actionsLoading = false;
      state.messageForEdit = action.payload.messageForEdit;
      state.error = null;
    },
    messagesAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },

    // findMessages
    messagesFetched: (state, action) => {
      const { totalCount, entities, realNames } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
      state.realNames = realNames;
    },
    // createMessage
    messageCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities = [...state.entities, action.payload.message];
    },
    // updateMessage
    messageUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.message.Id) {
          return action.payload.message;
        }
        return entity;
      });
    },
    // deleteMessage
    messageDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteMessages
    messagesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // messagesUpdateState
    messagesStatusUpdated: (state, action) => {
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
