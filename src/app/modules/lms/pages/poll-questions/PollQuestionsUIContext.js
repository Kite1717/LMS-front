import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./PollQuestionsUIHelpers";

const PollQuestionsUIContext = createContext();

export function usePollQuestionsUIContext() {
  return useContext(PollQuestionsUIContext);
}

export const PollQuestionsUIConsumer = PollQuestionsUIContext.Consumer;

export function PollQuestionsUIProvider({ pollQuestionsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initPollQuestion = {
    Id: undefined,
    Question: "",
   SurveyGroupId : 1,

  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initPollQuestion,
    newPollQuestionButtonClick:
      pollQuestionsUIEvents.newPollQuestionButtonClick,
    openEditPollQuestionDialog:
      pollQuestionsUIEvents.openEditPollQuestionDialog,
    openDeletePollQuestionDialog:
      pollQuestionsUIEvents.openDeletePollQuestionDialog,
    openDeletePollQuestionsDialog:
      pollQuestionsUIEvents.openDeletePollQuestionsDialog,
    openFetchPollQuestionsDialog:
      pollQuestionsUIEvents.openFetchPollQuestionsDialog,
    goPollQuestionsPage: pollQuestionsUIEvents.goPollQuestionsPage,
    openUpdatePollQuestionsStatusDialog:
      pollQuestionsUIEvents.openUpdatePollQuestionsStatusDialog,
  };

  return (
    <PollQuestionsUIContext.Provider value={value}>
      {children}
    </PollQuestionsUIContext.Provider>
  );
}
