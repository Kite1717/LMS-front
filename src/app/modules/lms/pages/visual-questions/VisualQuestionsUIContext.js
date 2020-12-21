import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./VisualQuestionsUIHelpers";

const VisualQuestionsUIContext = createContext();

export function useVisualQuestionsUIContext() {
  return useContext(VisualQuestionsUIContext);
}

export const VisualQuestionsUIConsumer = VisualQuestionsUIContext.Consumer;

export function VisualQuestionsUIProvider({
  visualQuestionsUIEvents,
  children,
}) {
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

  const initVisualQuestion = {
    Id: undefined,
    Name: "",
    AText: "",
    A: 2,
    BText: "",
    B: 2,
    CText: "",
    C: 2,
    DText: "",
    D: 2,
    IsThreatExists: 0,
    QuestionType : 0,
    Duration : 1,
    LibraryId : 0,
    LibraryId2:0,
    TopicId: 0,
    TruePlaceToClick : "",
    Image : "",
    TopicId : 0,
 
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initVisualQuestion,
    newVisualQuestionButtonClick:
      visualQuestionsUIEvents.newVisualQuestionButtonClick,
    openEditVisualQuestionDialog:
      visualQuestionsUIEvents.openEditVisualQuestionDialog,
    openDeleteVisualQuestionDialog:
      visualQuestionsUIEvents.openDeleteVisualQuestionDialog,
    openDeleteVisualQuestionsDialog:
      visualQuestionsUIEvents.openDeleteVisualQuestionsDialog,
    openFetchVisualQuestionsDialog:
      visualQuestionsUIEvents.openFetchVisualQuestionsDialog,
    goVisualQuestionsPage: visualQuestionsUIEvents.goVisualQuestionsPage,
    openUpdateVisualQuestionsStatusDialog:
      visualQuestionsUIEvents.openUpdateVisualQuestionsStatusDialog,

      openVisualQuestionDetailDialog:  visualQuestionsUIEvents.openVisualQuestionDetailDialog
  };

  return (
    <VisualQuestionsUIContext.Provider value={value}>
      {children}
    </VisualQuestionsUIContext.Provider>
  );
}
