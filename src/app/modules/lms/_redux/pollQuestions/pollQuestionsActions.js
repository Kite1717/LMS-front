import * as requestFromServer from "./pollQuestionsCrud";
import { pollQuestionsSlice, callTypes } from "./pollQuestionsSlice";

const { actions } = pollQuestionsSlice;

export const setSelectedPollQuestion = (pollQuestionId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setPollQuestion({ pollQuestionId }));
};

export const fetchAllPollQuestions = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllPollQuestions()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.pollQuestionsAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find pollQuestions";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchPollQuestionsByCourseId = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getByPollQuestionsCourseId(id)
    .then((response) => {
      const entities = response.data;
      console.log("fırıl fırıl", entities);
      dispatch(actions.pollQuestionsFetchedByCourseId({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find pollQuestions";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchPollQuestions = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPollQuestions(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      console.log("XDXDXDXD", entities);
      dispatch(actions.pollQuestionsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find pollQuestions";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchPollQuestion = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.pollQuestionFetched({ pollQuestionForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPollQuestionById(id)
    .then((response) => {
      const pollQuestion = response.data;
      dispatch(
        actions.pollQuestionFetched({ pollQuestionForEdit: pollQuestion })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find pollQuestion";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePollQuestion = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(id);
  return requestFromServer
    .deletePollQuestion(id)
    .then((response) => {
      dispatch(actions.pollQuestionDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete pollQuestion";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createPollQuestion = (pollQuestionForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPollQuestion(pollQuestionForCreation)
    .then((response) => {
      const { pollQuestion } = response.data;
      dispatch(actions.pollQuestionCreated({ pollQuestion }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create pollQuestion";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePollQuestion = (pollQuestion) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePollQuestion(pollQuestion)
    .then(() => {
      dispatch(actions.pollQuestionUpdated({ pollQuestion }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update pollQuestion";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePollQuestionsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPollQuestions(ids, status)
    .then(() => {
      dispatch(actions.pollQuestionsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update pollQuestions status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePollQuestions = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePollQuestions(ids)
    .then(() => {
      dispatch(actions.pollQuestionsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete pollQuestions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
