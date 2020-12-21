import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ExamsUIHelpers";

const ExamsUIContext = createContext();

export function useExamsUIContext() {
  return useContext(ExamsUIContext);
}

export const ExamsUIConsumer = ExamsUIContext.Consumer;

export function ExamsUIProvider({ examsUIEvents, children }) {
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

  const initExam = {
    Id: undefined,
    CourseId: undefined,
    TopicId: undefined,
    Name: "",
    Description: "",
    Duration: 0,
    SuccessRate: 0,
    ExamTypeId: 0,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initExam,
    newExamButtonClick: examsUIEvents.newExamButtonClick,
    openEditExamDialog: examsUIEvents.openEditExamDialog,
    openAssignExamDialog: examsUIEvents.openAssignExamDialog,
    openDeleteExamDialog: examsUIEvents.openDeleteExamDialog,
    openDeleteExamsDialog: examsUIEvents.openDeleteExamsDialog,
    openFetchExamsDialog: examsUIEvents.openFetchExamsDialog,
    goTopicsPage: examsUIEvents.goTopicsPage,
    goExamsReportPage: examsUIEvents.goExamsReportPage,
    openUpdateExamsStatusDialog: examsUIEvents.openUpdateExamsStatusDialog,
  };

  return (
    <ExamsUIContext.Provider value={value}>{children}</ExamsUIContext.Provider>
  );
}
