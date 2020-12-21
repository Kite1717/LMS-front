import * as requestFromServer from "./visualQuestionsCrud";
import { visualQuestionsSlice, callTypes } from "./visualQuestionsSlice";

const { actions } = visualQuestionsSlice;

export const setSelectedVisualQuestion = (visualQuestionId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setVisualQuestion({ visualQuestionId }));
};

export const fetchAllVisualQuestions = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllVisualQuestions()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.visualQuestionsAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find visualQuestions";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchVisualQuestions = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findVisualQuestions(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.visualQuestionsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find visualQuestions";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchVisualQuestion = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.visualQuestionFetched({ visualQuestionForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getVisualQuestionById(id)
    .then((response) => {
      const visualQuestion = response.data;
      dispatch(
        actions.visualQuestionFetched({ visualQuestionForEdit: visualQuestion })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find visualQuestion";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchVisualQuestionsTagByTopicId = (topicid) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getVisualQuestionsTagByTopicId(topicid)
    .then((response) => {
      const entities = response.data;
      dispatch(actions.visualQuestionTagFetchedByTopicId({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find questions";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const deleteVisualQuestion = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteVisualQuestion(id)
    .then((response) => {
      dispatch(actions.visualQuestionDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete visualQuestion";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createVisualQuestion = (visualQuestionForCreation) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createVisualQuestion(visualQuestionForCreation)
    .then((response) => {
      const { visualQuestion } = response.data;
      dispatch(actions.visualQuestionCreated({ visualQuestion }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create visualQuestion";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateVisualQuestion = (visualQuestion) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateVisualQuestion(visualQuestion)
    .then(() => {
      dispatch(actions.visualQuestionUpdated({ visualQuestion }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update visualQuestion";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateVisualQuestionsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForVisualQuestions(ids, status)
    .then(() => {
      dispatch(actions.visualQuestionsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update visualQuestions status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteVisualQuestions = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteVisualQuestions(ids)
    .then(() => {
      dispatch(actions.visualQuestionsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete visualQuestions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
