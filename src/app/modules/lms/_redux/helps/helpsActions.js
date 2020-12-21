import * as requestFromServer from "./helpsCrud";
import { helpsSlice, callTypes } from "./helpsSlice";

const { actions } = helpsSlice;

export const setSelectedHelp = (helpId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setHelp({ helpId }));
};

export const fetchAllHelpPackages = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllHelps()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.helpsAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientHelp = "Can't find helps";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchHelps = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findHelps(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.helpsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientHelp = "Can't find helps";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchHelp = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.helpFetched({ helpForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getHelpById(id)
    .then((response) => {
      const help = response.data;
      dispatch(actions.helpFetched({ helpForEdit: help }));
    })
    .catch((error) => {
      error.clientHelp = "Can't find help";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteHelp = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteHelp(id)
    .then((response) => {
      dispatch(actions.helpDeleted({ id }));
    })
    .catch((error) => {
      error.clientHelp = "Can't delete help";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createHelp = (helpForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createHelp(helpForCreation)
    .then((response) => {
      const help = response.data;
      dispatch(actions.helpCreated({ help }));
    })
    .catch((error) => {
      error.clientHelp = "Can't create help";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateHelp = (help) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateHelp(help)
    .then(() => {
      dispatch(actions.helpUpdated({ help }));
    })
    .catch((error) => {
      error.clientHelp = "Can't update help";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateHelpsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForHelps(ids, status)
    .then(() => {
      dispatch(actions.helpsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientHelp = "Can't update helps status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteHelps = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteHelps(ids)
    .then(() => {
      dispatch(actions.helpsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientHelp = "Can't delete helps";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
