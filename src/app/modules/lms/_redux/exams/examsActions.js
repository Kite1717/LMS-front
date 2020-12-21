import * as requestFromServer from "./examsCrud";
import { examsSlice, callTypes } from "./examsSlice";

const { actions } = examsSlice;

export const setSelectedExam = (examId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setExam({ examId }));
};

export const fetchAllExams = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllExams()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.examsAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find exams";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchExams = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findExams(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.examsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find exams";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchExam = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.examFetched({ examForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getExamById(id)
    .then((response) => {
      const exam = response.data;
      dispatch(actions.examFetched({ examForEdit: exam }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find exam";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteExam = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteExam(id)
    .then((response) => {
      dispatch(actions.examDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete exam";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createExam = (examForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createExam(examForCreation)
    .then((response) => {
      const exam = response.data;
      dispatch(actions.examCreated({ exam }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create exam";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateExam = (exam) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateExam(exam)
    .then(() => {
      dispatch(actions.examUpdated({ exam }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update exam";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateExamsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForExams(ids, status)
    .then(() => {
      dispatch(actions.examsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update exams status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteExams = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteExams(ids)
    .then(() => {
      dispatch(actions.examsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete exams";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
