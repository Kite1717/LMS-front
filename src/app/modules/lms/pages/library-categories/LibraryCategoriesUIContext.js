import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./LibraryCategoriesUIHelpers";

const LibraryCategoriesUIContext = createContext();

export function useLibraryCategoriesUIContext() {
  return useContext(LibraryCategoriesUIContext);
}

export const LibraryCategoriesUIConsumer = LibraryCategoriesUIContext.Consumer;

export function LibraryCategoriesUIProvider({
  libraryCategoriesUIEvents,
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

  const initLibraryCategory = {
    Id: undefined,
    Name: "",
    LibraryTypeId : 1,
    
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initLibraryCategory,
    newLibraryCategoryButtonClick:
      libraryCategoriesUIEvents.newLibraryCategoryButtonClick,
    openEditLibraryCategoryDialog:
      libraryCategoriesUIEvents.openEditLibraryCategoryDialog,
    openAssignLibraryCategoryDialog:
      libraryCategoriesUIEvents.openAssignLibraryCategoryDialog,
    openDeleteLibraryCategoryDialog:
      libraryCategoriesUIEvents.openDeleteLibraryCategoryDialog,
    openDeleteLibraryCategoriesDialog:
      libraryCategoriesUIEvents.openDeleteLibraryCategoriesDialog,
    openFetchLibraryCategoriesDialog:
      libraryCategoriesUIEvents.openFetchLibraryCategoriesDialog,
    goTopicsPage: libraryCategoriesUIEvents.goTopicsPage,
    openUpdateLibraryCategoriesStatusDialog:
      libraryCategoriesUIEvents.openUpdateLibraryCategoriesStatusDialog,
  };

  return (
    <LibraryCategoriesUIContext.Provider value={value}>
      {children}
    </LibraryCategoriesUIContext.Provider>
  );
}
