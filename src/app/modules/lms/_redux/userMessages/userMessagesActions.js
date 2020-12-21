import * as requestFromServer from "./userMessagesCrud";
import { userMessagesSlice, callTypes } from "./userMessagesSlice";

const { actions } = userMessagesSlice;

export const setSelectedUserMessage = (userMessageId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setUserMessage({ userMessageId }));
};

export const fetchAllUserMessage = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllUserMessages()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.userMessagesAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientUserMessage = "Can't find userMessages";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchUserMessages = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findUserMessages(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      console.log("eğpeğğeğe", entities);
      dispatch(actions.userMessagesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientUserMessage = "Can't find userMessages";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchUserMessage = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.userMessageFetched({ userMessageForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getUserMessageById(id)
    .then((response) => {
      const userMessage = response.data;
      dispatch(actions.userMessageFetched({ userMessageForEdit: userMessage }));
    })
    .catch((error) => {
      error.clientUserMessage = "Can't find userMessage";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteUserMessage = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUserMessage(id)
    .then((response) => {
      dispatch(actions.userMessageDeleted({ id }));
    })
    .catch((error) => {
      error.clientUserMessage = "Can't delete userMessage";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createUserMessage = (userMessageForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createUserMessage(userMessageForCreation)
    .then((response) => {
      const userMessage = response.data;
      dispatch(actions.userMessageCreated({ userMessage }));
    })
    .catch((error) => {
      error.clientUserMessage = "Can't create userMessage";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateUserMessage = (userMessage) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateUserMessage(userMessage)
    .then(() => {
      dispatch(actions.userMessageUpdated({ userMessage }));
    })
    .catch((error) => {
      error.clientUserMessage = "Can't update userMessage";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateUserMessagesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForUserMessages(ids, status)
    .then(() => {
      dispatch(actions.userMessagesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientUserMessage = "Can't update userMessages status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteUserMessages = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUserMessages(ids)
    .then(() => {
      dispatch(actions.userMessagesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientUserMessage = "Can't delete userMessages";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
