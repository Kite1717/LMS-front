import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./PollsUIHelpers";

const PollsUIContext = createContext();

export function usePollsUIContext() {
  return useContext(PollsUIContext);
}

export const PollsUIConsumer = PollsUIContext.Consumer;

export function PollsUIProvider({ pollsUIEvents, children }) {
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

  const initPoll = {
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
    initPoll,
    newPollButtonClick: pollsUIEvents.newPollButtonClick,
    openEditPollDialog: pollsUIEvents.openEditPollDialog,
    openAssignPollDialog: pollsUIEvents.openAssignPollDialog,
    openDeletePollDialog: pollsUIEvents.openDeletePollDialog,
    openDeletePollsDialog: pollsUIEvents.openDeletePollsDialog,
    openFetchPollsDialog: pollsUIEvents.openFetchPollsDialog,
    goTopicsPage: pollsUIEvents.goTopicsPage,
    goLibraryPage: pollsUIEvents.goLibraryPage,
    openUpdatePollsStatusDialog: pollsUIEvents.openUpdatePollsStatusDialog,
  };

  return (
    <PollsUIContext.Provider value={value}>{children}</PollsUIContext.Provider>
  );
}
