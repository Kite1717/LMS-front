import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./VisualExamsUIHelpers";

const VisualExamsUIContext = createContext();

export function useVisualExamsUIContext() {
  return useContext(VisualExamsUIContext);
}

export const VisualExamsUIConsumer = VisualExamsUIContext.Consumer;

export function VisualExamsUIProvider({ visualExamsUIEvents, children }) {
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

  const initVisualExam = {
    Id: undefined,
    CourseId: undefined,
    TopicId: undefined,
    Name: "",
    Description: "",
    Duration: 0,
    SuccessRate: 0,
    VisualExamTypeId: 0,
    ExamTypeId: 2,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initVisualExam,
    newVisualExamButtonClick: visualExamsUIEvents.newVisualExamButtonClick,
    openEditVisualExamDialog: visualExamsUIEvents.openEditVisualExamDialog,
    openAssignVisualExamDialog: visualExamsUIEvents.openAssignVisualExamDialog,
    openDeleteVisualExamDialog: visualExamsUIEvents.openDeleteVisualExamDialog,
    openDeleteVisualExamsDialog:
      visualExamsUIEvents.openDeleteVisualExamsDialog,
    openFetchVisualExamsDialog: visualExamsUIEvents.openFetchVisualExamsDialog,
    goTopicsPage: visualExamsUIEvents.goTopicsPage,
    openUpdateVisualExamsStatusDialog:
      visualExamsUIEvents.openUpdateVisualExamsStatusDialog,
    goExamsReportPage: visualExamsUIEvents.goExamsReportPage,
  };

  return (
    <VisualExamsUIContext.Provider value={value}>
      {children}
    </VisualExamsUIContext.Provider>
  );
}
