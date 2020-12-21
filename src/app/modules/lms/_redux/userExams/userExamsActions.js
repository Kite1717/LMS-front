import * as requestFromServer from "./userExamsCrud";
import { userExamsSlice, callTypes } from "./userExamsSlice";

const { actions } = userExamsSlice;

export const setSelectedUserExam = (userExamId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setUserExam({ userExamId }));
};

export const fetchAllUserExams = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllUserExams()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.userExamsAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find userExams";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchUserExamsTagByTopicId = (topicid) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getUserExamsTagByTopicId(topicid)
    .then((response) => {
      const entities = response.data;
      dispatch(actions.userExamsTagFetchedByTopicId({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find userExams";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchUserExams = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findUserExams(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.userExamsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find userExams";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchUserExam = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.userExamFetched({ userExamForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getUserExamById(id)
    .then((response) => {
      const userExam = response.data;
      dispatch(actions.userExamFetched({ userExamForEdit: userExam }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find userExam";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteUserExam = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUserExam(id)
    .then((response) => {
      dispatch(actions.userExamDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete userExam";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createUserExam = (userExamForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createUserExam(userExamForCreation)
    .then((response) => {
      const { userExam } = response.data;
      dispatch(actions.userExamCreated({ userExam }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create userExam";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateUserExam = (userExam) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateUserExam(userExam)
    .then(() => {
      dispatch(actions.userExamUpdated({ userExam }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update userExam";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateUserExamsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForUserExams(ids, status)
    .then(() => {
      dispatch(actions.userExamsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update userExams status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteUserExams = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUserExams(ids)
    .then(() => {
      dispatch(actions.userExamsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete userExams";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
