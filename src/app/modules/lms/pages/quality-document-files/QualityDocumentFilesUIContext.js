import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./QualityDocumentFilesUIHelpers";

const QualityDocumentFilesUIContext = createContext();

export function useQualityDocumentFilesUIContext() {
  return useContext(QualityDocumentFilesUIContext);
}

export const QualityDocumentFilesUIConsumer =
  QualityDocumentFilesUIContext.Consumer;

export function QualityDocumentFilesUIProvider({
  qualityDocumentFilesUIEvents,
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

  const initQualityDocumentFile = {
    Id: undefined,
    Name: "",
    FileOrUrl: "",
    CourseTypeId: 1,
    TopicId: 0,
    DocumentName: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initQualityDocumentFile,
    newQualityDocumentFileButtonClick:
      qualityDocumentFilesUIEvents.newQualityDocumentFileButtonClick,
    openEditQualityDocumentFileDialog:
      qualityDocumentFilesUIEvents.openEditQualityDocumentFileDialog,
    openDeleteQualityDocumentFileDialog:
      qualityDocumentFilesUIEvents.openDeleteQualityDocumentFileDialog,
    openDeleteQualityDocumentFilesDialog:
      qualityDocumentFilesUIEvents.openDeleteQualityDocumentFilesDialog,
    openFetchQualityDocumentFilesDialog:
      qualityDocumentFilesUIEvents.openFetchQualityDocumentFilesDialog,
    goQualityDocumentFilesPage:
      qualityDocumentFilesUIEvents.goQualityDocumentFilesPage,
    openUpdateQualityDocumentFilesStatusDialog:
      qualityDocumentFilesUIEvents.openUpdateQualityDocumentFilesStatusDialog,
  };

  return (
    <QualityDocumentFilesUIContext.Provider value={value}>
      {children}
    </QualityDocumentFilesUIContext.Provider>
  );
}
