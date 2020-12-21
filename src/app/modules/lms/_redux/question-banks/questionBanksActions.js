import * as requestFromServer from "./questionBanksCrud";
import { questionBanksSlice, callTypes } from "./questionBanksSlice";

const { actions } = questionBanksSlice;

export const setSelectedQuestionBank = (questionBankId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setQuestionBank({ questionBankId }));
};

export const fetchAllQuestionBanks = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllQuestionBanks()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.questionBanksAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find questionBanks";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchQuestionBanksTagByTopicId = (topicid) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getQuestionBanksTagByTopicId(topicid)
    .then((response) => {
      const entities = response.data;
      dispatch(actions.questionBanksTagFetchedByTopicId({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find questionBanks";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchQuestionBanks = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findQuestionBanks(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.questionBanksFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find questionBanks";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchQuestionBank = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.questionBankFetched({ questionBankForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getQuestionBankById(id)
    .then((response) => {
      const questionBank = response.data;
      dispatch(
        actions.questionBankFetched({ questionBankForEdit: questionBank })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find questionBank";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteQuestionBank = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteQuestionBank(id)
    .then((response) => {
      dispatch(actions.questionBankDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete questionBank";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createQuestionBank = (questionBankForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createQuestionBank(questionBankForCreation)
    .then((response) => {
      const { questionBank } = response.data;
      dispatch(actions.questionBankCreated({ questionBank }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create questionBank";
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
      error.clientMessage = "Can't create questionBank";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateQuestionBank = (questionBank) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateQuestionBank(questionBank)
    .then(() => {
      dispatch(actions.questionBankUpdated({ questionBank }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update questionBank";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateQuestionBanksStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForQuestionBanks(ids, status)
    .then(() => {
      dispatch(actions.questionBanksStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update questionBanks status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteQuestionBanks = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteQuestionBanks(ids)
    .then(() => {
      dispatch(actions.questionBanksDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete questionBanks";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
