import * as requestFromServer from "./qualityDocumentsCrud";
import { qualityDocumentsSlice, callTypes } from "./qualityDocumentsSlice";

const { actions } = qualityDocumentsSlice;

export const setSelectedQualityDocument = (qualityDocumentId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setQualityDocument({ qualityDocumentId }));
};

export const fetchAllQualityDocuments = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllQualityDocuments()
    .then((response) => {
      const entities = response.data;

      dispatch(actions.qualityDocumentsAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find qualityDocuments";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchQualityDocuments = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findQualityDocuments(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.qualityDocumentsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find qualityDocuments";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchQualityDocument = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.qualityDocumentFetched({ qualityDocumentForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getQualityDocumentById(id)
    .then((response) => {
      const qualityDocument = response.data;
      dispatch(
        actions.qualityDocumentFetched({
          qualityDocumentForEdit: qualityDocument,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find qualityDocument";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteQualityDocument = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteQualityDocument(id)
    .then((response) => {
      dispatch(actions.qualityDocumentDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete qualityDocument";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createQualityDocument = (qualityDocumentForCreation) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createQualityDocument(qualityDocumentForCreation)
    .then((response) => {
      const qualityDocument = response.data;
      dispatch(actions.qualityDocumentCreated({ qualityDocument }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create qualityDocument";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateQualityDocument = (qualityDocument) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateQualityDocument(qualityDocument)
    .then(() => {
      dispatch(actions.qualityDocumentUpdated({ qualityDocument }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update qualityDocument";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateQualityDocumentsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForQualityDocuments(ids, status)
    .then(() => {
      dispatch(actions.qualityDocumentsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update qualityDocuments status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteQualityDocuments = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteQualityDocuments(ids)
    .then(() => {
      dispatch(actions.qualityDocumentsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete qualityDocuments";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
