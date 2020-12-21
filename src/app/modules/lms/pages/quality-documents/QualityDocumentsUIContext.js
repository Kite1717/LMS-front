import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./QualityDocumentsUIHelpers";

const QualityDocumentsUIContext = createContext();

export function useQualityDocumentsUIContext() {
  return useContext(QualityDocumentsUIContext);
}

export const QualityDocumentsUIConsumer = QualityDocumentsUIContext.Consumer;

export function QualityDocumentsUIProvider({
  qualityDocumentsUIEvents,
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

  const initQualityDocument = {
    Id: undefined,
    Name: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initQualityDocument,
    newQualityDocumentButtonClick:
      qualityDocumentsUIEvents.newQualityDocumentButtonClick,
    openEditQualityDocumentDialog:
      qualityDocumentsUIEvents.openEditQualityDocumentDialog,
    openDeleteQualityDocumentDialog:
      qualityDocumentsUIEvents.openDeleteQualityDocumentDialog,
    openDeleteQualityDocumentsDialog:
      qualityDocumentsUIEvents.openDeleteQualityDocumentsDialog,
    openFetchQualityDocumentsDialog:
      qualityDocumentsUIEvents.openFetchQualityDocumentsDialog,
    goQualityDocumentSubjectsPage:
      qualityDocumentsUIEvents.goQualityDocumentSubjectsPage,
    openUpdateQualityDocumentsStatusDialog:
      qualityDocumentsUIEvents.openUpdateQualityDocumentsStatusDialog,
  };

  return (
    <QualityDocumentsUIContext.Provider value={value}>
      {children}
    </QualityDocumentsUIContext.Provider>
  );
}
