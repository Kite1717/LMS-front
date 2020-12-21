import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./IpAdressesUIHelpers";

const IpAdressesUIContext = createContext();

export function useIpAdressesUIContext() {
  return useContext(IpAdressesUIContext);
}

export const IpAdressesUIConsumer = IpAdressesUIContext.Consumer;

export function IpAdressesUIProvider({ ipAdressesUIEvents, children }) {
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

  const initIpAdress = {
    Id: undefined,
    CompanyId: 0,
    Ip: "",
    Description: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initIpAdress,
    newIpAdressButtonClick: ipAdressesUIEvents.newIpAdressButtonClick,
    openEditIpAdressDialog: ipAdressesUIEvents.openEditIpAdressDialog,
    openDeleteIpAdressDialog: ipAdressesUIEvents.openDeleteIpAdressDialog,
    openDeleteIpAdressesDialog: ipAdressesUIEvents.openDeleteIpAdressesDialog,
    openFetchIpAdressesDialog: ipAdressesUIEvents.openFetchIpAdressesDialog,
    goIpAdressSubjectsPage: ipAdressesUIEvents.goIpAdressSubjectsPage,
    openUpdateIpAdressesStatusDialog:
      ipAdressesUIEvents.openUpdateIpAdressesStatusDialog,
  };

  return (
    <IpAdressesUIContext.Provider value={value}>
      {children}
    </IpAdressesUIContext.Provider>
  );
}
