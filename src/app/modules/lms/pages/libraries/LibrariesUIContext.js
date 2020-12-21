import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./LibrariesUIHelpers";

const LibrariesUIContext = createContext();

export function useLibrariesUIContext() {
  return useContext(LibrariesUIContext);
}

export const LibrariesUIConsumer = LibrariesUIContext.Consumer;

export function LibrariesUIProvider({ librariesUIEvents, children }) {
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

  const initLibrary = {
    Id: undefined,
    Code: "",
    StartDay: "",
    EndDay: "",
    File: "",
    CourseId: 0,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initLibrary,
    newLibraryButtonClick: librariesUIEvents.newLibraryButtonClick,
    openEditLibraryDialog: librariesUIEvents.openEditLibraryDialog,
    openAssignLibraryDialog: librariesUIEvents.openAssignLibraryDialog,
    openDeleteLibraryDialog: librariesUIEvents.openDeleteLibraryDialog,
    openDeleteLibrariesDialog: librariesUIEvents.openDeleteLibrariesDialog,
    openFetchLibrariesDialog: librariesUIEvents.openFetchLibrariesDialog,
    goTopicsPage: librariesUIEvents.goTopicsPage,
    openUpdateLibrariesStatusDialog:
      librariesUIEvents.openUpdateLibrariesStatusDialog,
  };

  return (
    <LibrariesUIContext.Provider value={value}>
      {children}
    </LibrariesUIContext.Provider>
  );
}
