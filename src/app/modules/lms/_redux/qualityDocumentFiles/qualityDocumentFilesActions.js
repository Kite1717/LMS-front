import * as requestFromServer from "./qualityDocumentFilesCrud";
import {
  qualityDocumentFilesSlice,
  callTypes,
} from "./qualityDocumentFilesSlice";

const { actions } = qualityDocumentFilesSlice;

export const setSelectedQualityDocumentFile = (qualityDocumentFileId) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setQualityDocumentFile({ qualityDocumentFileId }));
};

export const fetchAllQualityDocumentFiles = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllQualityDocumentFiles()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.qualityDocumentFilesAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find qualityDocumentFiles";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchQualityDocumentFiles = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findQualityDocumentFiles(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.qualityDocumentFilesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find qualityDocumentFiles";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchQualityDocumentFile = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.qualityDocumentFileFetched({
        qualityDocumentFileForEdit: undefined,
      })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getQualityDocumentFileById(id)
    .then((response) => {
      const qualityDocumentFile = response.data;
      dispatch(
        actions.qualityDocumentFileFetched({
          qualityDocumentFileForEdit: qualityDocumentFile,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find qualityDocumentFile";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteQualityDocumentFile = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteQualityDocumentFile(id)
    .then((response) => {
      dispatch(actions.qualityDocumentFileDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete qualityDocumentFile";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createQualityDocumentFile = (qualityDocumentFileForCreation) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createQualityDocumentFile(qualityDocumentFileForCreation)
    .then((response) => {
      const { qualityDocumentFile } = response.data;
      dispatch(actions.qualityDocumentFileCreated({ qualityDocumentFile }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create qualityDocumentFile";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateQualityDocumentFile = (qualityDocumentFile) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateQualityDocumentFile(qualityDocumentFile)
    .then(() => {
      dispatch(actions.qualityDocumentFileUpdated({ qualityDocumentFile }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update qualityDocumentFile";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateQualityDocumentFilesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForQualityDocumentFiles(ids, status)
    .then(() => {
      dispatch(actions.qualityDocumentFilesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update qualityDocumentFiles status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteQualityDocumentFiles = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteQualityDocumentFiles(ids)
    .then(() => {
      dispatch(actions.qualityDocumentFilesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete qualityDocumentFiles";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
