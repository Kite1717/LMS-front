import * as requestFromServer from "./visualExamsCrud";
import { visualExamsSlice, callTypes } from "./visualExamsSlice";

const { actions } = visualExamsSlice;

export const setSelectedVisualExam = (visualExamId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setVisualExam({ visualExamId }));
};

export const fetchAllVisualExams = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllVisualExams()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.visualExamsAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find visualExams";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchVisualExams = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findVisualExams(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.visualExamsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find visualExams";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchVisualExam = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.visualExamFetched({ visualExamForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getVisualExamById(id)
    .then((response) => {
      const visualExam = response.data;
      dispatch(actions.visualExamFetched({ visualExamForEdit: visualExam }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find visualExam";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteVisualExam = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteVisualExam(id)
    .then((response) => {
      dispatch(actions.visualExamDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete visualExam";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createVisualExam = (visualExamForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createVisualExam(visualExamForCreation)
    .then((response) => {
      const exam = response.data;
      dispatch(actions.visualExamCreated({ exam }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create visualExam";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateVisualExam = (visualExam) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateVisualExam(visualExam)
    .then(() => {
      dispatch(actions.visualExamUpdated({ visualExam }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update visualExam";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateVisualExamsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForVisualExams(ids, status)
    .then(() => {
      dispatch(actions.visualExamsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update visualExams status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteVisualExams = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteVisualExams(ids)
    .then(() => {
      dispatch(actions.visualExamsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete visualExams";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
