import * as requestFromServer from "./pollsCrud";
import { pollsSlice, callTypes } from "./pollsSlice";

const { actions } = pollsSlice;

export const setSelectedPoll = (pollId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setPoll({ pollId }));
};

export const fetchAllPolls = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllPolls()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.pollsAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find polls";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchPolls = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPolls(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.pollsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find polls";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchPoll = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.pollFetched({ pollForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPollById(id)
    .then((response) => {
      const poll = response.data;
      dispatch(actions.pollFetched({ pollForEdit: poll }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find poll";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePoll = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePoll(id)
    .then((response) => {
      dispatch(actions.pollDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete poll";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createPoll = (pollForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPoll(pollForCreation)
    .then((response) => {
      const poll = response.data;
      dispatch(actions.pollCreated({ poll }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create poll";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePoll = (poll) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePoll(poll)
    .then(() => {
      dispatch(actions.pollUpdated({ poll }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update poll";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePollsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPolls(ids, status)
    .then(() => {
      dispatch(actions.pollsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update polls status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePolls = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePolls(ids)
    .then(() => {
      dispatch(actions.pollsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete polls";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
