import * as requestFromServer from "./messagesCrud";
import { messagesSlice, callTypes } from "./messagesSlice";

const { actions } = messagesSlice;

export const setSelectedMessage = (messageId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setMessage({ messageId }));
};

export const fetchAllMessage = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllMessages()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.messagesAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find messages";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchMessages = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findMessages(queryParams)
    .then((response) => {
      const { entities, realNames } = response.data;

      let total = 0;
      if (entities !== null && entities !== undefined) {
        let counter = 0;
        total = entities.length;
        for (let i = 0; i < entities.length; i++) {
          console.log(entities[i].Name);
          if (entities[i].Name === "gönderen") {
           
            entities[i].Name = realNames[counter].RealName;
            counter++;
          }
        }
      }

      dispatch(actions.messagesFetched({ total, entities, realNames }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find messages";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchMessage = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.messageFetched({ messageForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getMessageById(id)
    .then((response) => {
      const message = response.data;
      dispatch(actions.messageFetched({ messageForEdit: message }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find message";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteMessage = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMessage(id)
    .then((response) => {
      dispatch(actions.messageDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete message";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createMessage = (messageForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createMessage(messageForCreation)
    .then((response) => {
      const message = response.data;
      dispatch(actions.messageCreated({ message }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create message";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateMessage = (message) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateMessage(message)
    .then(() => {
      dispatch(actions.messageUpdated({ message }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update message";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateMessagesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForMessages(ids, status)
    .then(() => {
      dispatch(actions.messagesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update messages status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteMessages = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMessages(ids)
    .then(() => {
      dispatch(actions.messagesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete messages";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
