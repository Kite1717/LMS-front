import * as requestFromServer from "./librariesCrud";
import { librariesSlice, callTypes } from "./librariesSlice";

const { actions } = librariesSlice;

export const setSelectedLibrary = (libraryId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setLibrary({ libraryId }));
};

export const fetchAllLibraries = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllLibraries()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.librariesAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find libraries";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchLibraries = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findLibraries(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.librariesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find libraries";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchLibrary = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.libraryFetched({ libraryForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getLibraryById(id)
    .then((response) => {
      const library = response.data;
      dispatch(actions.libraryFetched({ libraryForEdit: library }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find library";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteLibrary = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteLibrary(id)
    .then((response) => {
      dispatch(actions.libraryDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete library";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createLibrary = (libraryForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createLibrary(libraryForCreation)
    .then((response) => {
      const library = response.data;
      dispatch(actions.libraryCreated({ library }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create library";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateLibrary = (library) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateLibrary(library)
    .then(() => {
      dispatch(actions.libraryUpdated({ library }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update library";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateLibrariesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForLibraries(ids, status)
    .then(() => {
      dispatch(actions.librariesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update libraries status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteLibraries = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteLibraries(ids)
    .then(() => {
      dispatch(actions.librariesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete libraries";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
