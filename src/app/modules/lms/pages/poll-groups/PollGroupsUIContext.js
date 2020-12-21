import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./PollGroupsUIHelpers";

const PollGroupsUIContext = createContext();

export function usePollGroupsUIContext() {
  return useContext(PollGroupsUIContext);
}

export const PollGroupsUIConsumer = PollGroupsUIContext.Consumer;

export function PollGroupsUIProvider({ pollGroupsUIEvents, children }) {
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

  const initPollGroup = {
    Id: undefined,
    SurveyId: 1,
    Name: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initPollGroup,
    newPollGroupButtonClick: pollGroupsUIEvents.newPollGroupButtonClick,
    openEditPollGroupDialog: pollGroupsUIEvents.openEditPollGroupDialog,
    openDeletePollGroupDialog: pollGroupsUIEvents.openDeletePollGroupDialog,
    openDeletePollGroupsDialog: pollGroupsUIEvents.openDeletePollGroupsDialog,
    openFetchPollGroupsDialog: pollGroupsUIEvents.openFetchPollGroupsDialog,
    goPollsSectionsPage: pollGroupsUIEvents.goPollsSectionsPage,
    goQuestionsPage: pollGroupsUIEvents.goQuestionsPage,
    goPollQuestionsPage: pollGroupsUIEvents.goPollQuestionsPage,
    goVisualQuestionsPage: pollGroupsUIEvents.goVisualQuestionsPage,
    openUpdatePollGroupsStatusDialog:
      pollGroupsUIEvents.openUpdatePollGroupsStatusDialog,
  };

  return (
    <PollGroupsUIContext.Provider value={value}>
      {children}
    </PollGroupsUIContext.Provider>
  );
}
