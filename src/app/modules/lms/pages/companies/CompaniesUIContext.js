import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./CompaniesUIHelpers";

const CompaniesUIContext = createContext();

export function useCompaniesUIContext() {
  return useContext(CompaniesUIContext);
}

export const CompaniesUIConsumer = CompaniesUIContext.Consumer;

export function CompaniesUIProvider({ companiesUIEvents, children }) {
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

  const initCompany = {
    Id: undefined,
    CompanyTypeId: 1,
    FullName: "",
    ShortName: "",
    TaxNumber: "",
    TaxAdministration: "",
    Address: "",
    Phone: "",
    RelevantPersonFullName: "",
    RelevantPersonEmail: "",
    RelevantPersonPhone: "",
    ContractStartDate: "",
    ContractEndDate: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initCompany,
    newCompanyButtonClick: companiesUIEvents.newCompanyButtonClick,
    openEditCompanyDialog: companiesUIEvents.openEditCompanyDialog,
    openDeleteCompanyDialog: companiesUIEvents.openDeleteCompanyDialog,
    openDetailCompaniesDialog: companiesUIEvents.openDetailCompaniesDialog,
    openDeleteCompaniesDialog: companiesUIEvents.openDeleteCompaniesDialog,
    openFetchCompaniesDialog: companiesUIEvents.openFetchCompaniesDialog,
    goUsersPage: companiesUIEvents.goUsersPage,
    openUpdateCompaniesStatusDialog:
      companiesUIEvents.openUpdateCompaniesStatusDialog,
  };

  return (
    <CompaniesUIContext.Provider value={value}>
      {children}
    </CompaniesUIContext.Provider>
  );
}
