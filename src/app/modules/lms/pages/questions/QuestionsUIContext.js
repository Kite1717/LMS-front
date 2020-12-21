import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./QuestionsUIHelpers";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const QuestionsUIContext = createContext();

export function useQuestionsUIContext() {
  return useContext(QuestionsUIContext);
}

export const QuestionsUIConsumer = QuestionsUIContext.Consumer;

export function QuestionsUIProvider({ questionsUIEvents, children }) {
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

  const { topicState } = useSelector(
    (state) => ({ topicState: state.topics }),
    shallowEqual
  );
  const { selectedTopic } = topicState;

  const initQuestion = {
    Id: undefined,
    AText: "",
    A: 2,
    BText: "",
    B: 2,
    CText: "",
    C: 2,
    DText: "",
    D: 2,
    TopicId: selectedTopic || 0,
    IsSectionEndQuestion: 0,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initQuestion,
    newQuestionButtonClick: questionsUIEvents.newQuestionButtonClick,
    openEditQuestionDialog: questionsUIEvents.openEditQuestionDialog,
    openBulkInsertDialog: questionsUIEvents.openBulkInsertDialog,
    openDeleteQuestionDialog: questionsUIEvents.openDeleteQuestionDialog,
    openDeleteQuestionsDialog: questionsUIEvents.openDeleteQuestionsDialog,
    openFetchQuestionsDialog: questionsUIEvents.openFetchQuestionsDialog,
    goQuestionsPage: questionsUIEvents.goQuestionsPage,
    openUpdateQuestionsStatusDialog:
      questionsUIEvents.openUpdateQuestionsStatusDialog,
  };

  return (
    <QuestionsUIContext.Provider value={value}>
      {children}
    </QuestionsUIContext.Provider>
  );
}
