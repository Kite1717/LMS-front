import * as requestFromServer from "./qualityDocumentSubjectsCrud";
import {
  qualityDocumentSubjectsSlice,
  callTypes,
} from "./qualityDocumentSubjectsSlice";

const { actions } = qualityDocumentSubjectsSlice;

export const setSelectedQualityDocumentSubject = (qualityDocumentSubjectId) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(
    actions.setQualityDocumentSubject({ qualityDocumentSubjectId })
  );
};

export const fetchAllQualityDocumentSubjects = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllQualityDocumentSubjects()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.qualityDocumentSubjectsAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find qualityDocumentSubjects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchQualityDocumentSubjectsBySubjectId = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getByQualityDocumentSubjectsSubjectId(id)
    .then((response) => {
      const entities = response.data;
      dispatch(actions.qualityDocumentSubjectsFetchedBySubjecyId({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find qualityDocumentSubjects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchQualityDocumentSubjects = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findQualityDocumentSubjects(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(
        actions.qualityDocumentSubjectsFetched({ totalCount, entities })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find qualityDocumentSubjects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchQualityDocumentSubject = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.qualityDocumentSubjectFetched({
        qualityDocumentSubjectForEdit: undefined,
      })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getQualityDocumentSubjectById(id)
    .then((response) => {
      const qualityDocumentSubject = response.data;
      dispatch(
        actions.qualityDocumentSubjectFetched({
          qualityDocumentSubjectForEdit: qualityDocumentSubject,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find qualityDocumentSubject";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteQualityDocumentSubject = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteQualityDocumentSubject(id)
    .then((response) => {
      dispatch(actions.qualityDocumentSubjectDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete qualityDocumentSubject";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createQualityDocumentSubject = (
  qualityDocumentSubjectForCreation
) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createQualityDocumentSubject(qualityDocumentSubjectForCreation)
    .then((response) => {
      const { qualityDocumentSubject } = response.data;
      dispatch(
        actions.qualityDocumentSubjectCreated({ qualityDocumentSubject })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't create qualityDocumentSubject";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateQualityDocumentSubject = (qualityDocumentSubject) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateQualityDocumentSubject(qualityDocumentSubject)
    .then(() => {
      dispatch(
        actions.qualityDocumentSubjectUpdated({ qualityDocumentSubject })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't update qualityDocumentSubject";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateQualityDocumentSubjectsStatus = (ids, status) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForQualityDocumentSubjects(ids, status)
    .then(() => {
      dispatch(actions.qualityDocumentSubjectsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update qualityDocumentSubjects status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteQualityDocumentSubjects = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteQualityDocumentSubjects(ids)
    .then(() => {
      dispatch(actions.qualityDocumentSubjectsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete qualityDocumentSubjects";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
