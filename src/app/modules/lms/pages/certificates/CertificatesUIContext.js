import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./CertificatesUIHelpers";

const CertificatesUIContext = createContext();

export function useCertificatesUIContext() {
  return useContext(CertificatesUIContext);
}

export const CertificatesUIConsumer = CertificatesUIContext.Consumer;

export function CertificatesUIProvider({ certificatesUIEvents, children }) {
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

  const initCertificate = {
    Id: undefined,
    TCNo: 0,
    Text: "",
    CCode: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initCertificate,
    newCertificateButtonClick: certificatesUIEvents.newCertificateButtonClick,
    openEditCertificateDialog: certificatesUIEvents.openEditCertificateDialog,
    openDeleteCertificateDialog:
      certificatesUIEvents.openDeleteCertificateDialog,
    openDeleteCertificatesDialog:
      certificatesUIEvents.openDeleteCertificatesDialog,
    openFetchCertificatesDialog:
      certificatesUIEvents.openFetchCertificatesDialog,
    goCertificateSubjectsPage: certificatesUIEvents.goCertificateSubjectsPage,
    openUpdateCertificatesStatusDialog:
      certificatesUIEvents.openUpdateCertificatesStatusDialog,
  };

  return (
    <CertificatesUIContext.Provider value={value}>
      {children}
    </CertificatesUIContext.Provider>
  );
}
