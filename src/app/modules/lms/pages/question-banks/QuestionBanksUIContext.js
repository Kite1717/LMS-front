import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./QuestionBanksUIHelpers";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const QuestionBanksUIContext = createContext();

export function useQuestionBanksUIContext() {
  return useContext(QuestionBanksUIContext);
}

export const QuestionBanksUIConsumer = QuestionBanksUIContext.Consumer;

export function QuestionBanksUIProvider({ questionBanksUIEvents, children }) {
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

  const { courseState } = useSelector(
    (state) => ({ courseState: state.courses }),
    shallowEqual
  );
  const { selectedCourse } = courseState;

  const initQuestionBank = {
    Id: undefined,
    AText: "",
    A: 2,
    BText: "",
    B: 2,
    CText: "",
    C: 2,
    DText: "",
    D: 2,
    CourseId: selectedCourse || 0,
    IsSectionEndQuestionBank: 0,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initQuestionBank,
    newQuestionBankButtonClick:
      questionBanksUIEvents.newQuestionBankButtonClick,
    openEditQuestionBankDialog:
      questionBanksUIEvents.openEditQuestionBankDialog,
    openBulkInsertDialog: questionBanksUIEvents.openBulkInsertDialog,
    openDeleteQuestionBankDialog:
      questionBanksUIEvents.openDeleteQuestionBankDialog,
    openDeleteQuestionBanksDialog:
      questionBanksUIEvents.openDeleteQuestionBanksDialog,
    openFetchQuestionBanksDialog:
      questionBanksUIEvents.openFetchQuestionBanksDialog,
    goQuestionBanksPage: questionBanksUIEvents.goQuestionBanksPage,
    openUpdateQuestionBanksStatusDialog:
      questionBanksUIEvents.openUpdateQuestionBanksStatusDialog,
  };

  return (
    <QuestionBanksUIContext.Provider value={value}>
      {children}
    </QuestionBanksUIContext.Provider>
  );
}
