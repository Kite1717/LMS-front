import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./TopicsUIHelpers";

const TopicsUIContext = createContext();

export function useTopicsUIContext() {
  return useContext(TopicsUIContext);
}

export const TopicsUIConsumer = TopicsUIContext.Consumer;

export function TopicsUIProvider({ topicsUIEvents, children }) {
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

  const initTopic = {
    Id: undefined,
    CourseId: 1,
    Name: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initTopic,
    newTopicButtonClick: topicsUIEvents.newTopicButtonClick,
    openEditTopicDialog: topicsUIEvents.openEditTopicDialog,
    openDeleteTopicDialog: topicsUIEvents.openDeleteTopicDialog,
    openDeleteTopicsDialog: topicsUIEvents.openDeleteTopicsDialog,
    openFetchTopicsDialog: topicsUIEvents.openFetchTopicsDialog,
    goCourseSectionsPage: topicsUIEvents.goCourseSectionsPage,
    goQuestionsPage: topicsUIEvents.goQuestionsPage,
    goVisualQuestionsPage: topicsUIEvents.goVisualQuestionsPage,
    openUpdateTopicsStatusDialog: topicsUIEvents.openUpdateTopicsStatusDialog,
  };

  return (
    <TopicsUIContext.Provider value={value}>
      {children}
    </TopicsUIContext.Provider>
  );
}
