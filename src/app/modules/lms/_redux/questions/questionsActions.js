import * as requestFromServer from "./questionsCrud";
import { questionsSlice, callTypes } from "./questionsSlice";

const { actions } = questionsSlice;

export const setSelectedQuestion = (questionId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setQuestion({ questionId }));
};

export const fetchAllQuestions = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllQuestions()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.questionsAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find questions";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchQuestionsTagByTopicId = (topicid) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getQuestionsTagByTopicId(topicid)
    .then((response) => {
      const entities = response.data;
      dispatch(actions.questionsTagFetchedByTopicId({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find questions";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchQuestions = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findQuestions(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.questionsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find questions";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchQuestion = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.questionFetched({ questionForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getQuestionById(id)
    .then((response) => {
      const question = response.data;
      dispatch(actions.questionFetched({ questionForEdit: question }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find question";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteQuestion = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteQuestion(id)
    .then((response) => {
      dispatch(actions.questionDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete question";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createQuestion = (questionForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createQuestion(questionForCreation)
    .then((response) => {
      const { question } = response.data;
      dispatch(actions.questionCreated({ question }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create question";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createBulkFile = (bulkFileForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createBulkFile(bulkFileForCreation)
    .then((response) => {
      console.log("createBulkFile -> response", response);

      const { bulkFile } = response.data;
      dispatch(actions.bulkFileCreated({ bulkFile }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create question";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateQuestion = (question) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateQuestion(question)
    .then(() => {
      dispatch(actions.questionUpdated({ question }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update question";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateQuestionsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForQuestions(ids, status)
    .then(() => {
      dispatch(actions.questionsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update questions status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteQuestions = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteQuestions(ids)
    .then(() => {
      dispatch(actions.questionsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete questions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
