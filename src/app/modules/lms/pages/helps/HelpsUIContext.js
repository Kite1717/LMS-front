import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./HelpsUIHelpers";

const HelpsUIContext = createContext();

export function useHelpsUIContext() {
  return useContext(HelpsUIContext);
}

export const HelpsUIConsumer = HelpsUIContext.Consumer;

export function HelpsUIProvider({ helpsUIEvents, children }) {
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

  const initHelp = {
    Id: undefined,
    HelpCategorId: 0,
    Title: "",
    Text: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initHelp,
    newHelpButtonClick: helpsUIEvents.newHelpButtonClick,
    openEditHelpDialog: helpsUIEvents.openEditHelpDialog,
    openAssignHelpDialog: helpsUIEvents.openAssignHelpDialog,
    openDeleteHelpDialog: helpsUIEvents.openDeleteHelpDialog,
    openDeleteHelpsDialog: helpsUIEvents.openDeleteHelpsDialog,
    openFetchHelpsDialog: helpsUIEvents.openFetchHelpsDialog,
    goTopicsPage: helpsUIEvents.goTopicsPage,
    openUpdateHelpsStatusDialog: helpsUIEvents.openUpdateHelpsStatusDialog,
  };

  return (
    <HelpsUIContext.Provider value={value}>{children}</HelpsUIContext.Provider>
  );
}
