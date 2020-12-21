import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./QualityDocumentSubjectsUIHelpers";

const QualityDocumentSubjectsUIContext = createContext();

export function useQualityDocumentSubjectsUIContext() {
  return useContext(QualityDocumentSubjectsUIContext);
}

export const QualityDocumentSubjectsUIConsumer =
  QualityDocumentSubjectsUIContext.Consumer;

export function QualityDocumentSubjectsUIProvider({
  qualityDocumentSubjectsUIEvents,
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

  const initQualityDocumentSubject = {
    Id: undefined,
    DocumentCategoryId: 1,
    Name: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initQualityDocumentSubject,
    newQualityDocumentSubjectButtonClick:
      qualityDocumentSubjectsUIEvents.newQualityDocumentSubjectButtonClick,
    openEditQualityDocumentSubjectDialog:
      qualityDocumentSubjectsUIEvents.openEditQualityDocumentSubjectDialog,
    openDeleteQualityDocumentSubjectDialog:
      qualityDocumentSubjectsUIEvents.openDeleteQualityDocumentSubjectDialog,
    openDeleteQualityDocumentSubjectsDialog:
      qualityDocumentSubjectsUIEvents.openDeleteQualityDocumentSubjectsDialog,
    openFetchQualityDocumentSubjectsDialog:
      qualityDocumentSubjectsUIEvents.openFetchQualityDocumentSubjectsDialog,
    goQualityDocumentFilesPage:
      qualityDocumentSubjectsUIEvents.goQualityDocumentFilesPage,
    goQuestionsPage: qualityDocumentSubjectsUIEvents.goQuestionsPage,
    openUpdateQualityDocumentSubjectsStatusDialog:
      qualityDocumentSubjectsUIEvents.openUpdateQualityDocumentSubjectsStatusDialog,
  };

  return (
    <QualityDocumentSubjectsUIContext.Provider value={value}>
      {children}
    </QualityDocumentSubjectsUIContext.Provider>
  );
}
