import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UsersUIHelpers";

const UsersUIContext = createContext();

export function useUsersUIContext() {
  return useContext(UsersUIContext);
}

export const UsersUIConsumer = UsersUIContext.Consumer;

export function UsersUIProvider({ usersUIEvents, children }) {
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

  const initUser = {
    Id: undefined,
    Email: "",
    TCNo: "",
    Password: "",
    PasswordAgain: "",
    Role: 2,
    FirstName: "",
    LastName: "",
    Address: "",
    PhoneNumber: "",
    CompanyId: null,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initUser,
    newUserButtonClick: usersUIEvents.newUserButtonClick,
    openEditUserDialog: usersUIEvents.openEditUserDialog,
    openDetailUsersDialog: usersUIEvents.openDetailUsersDialog,
    openBulkInsertDialog: usersUIEvents.openBulkInsertDialog,
    openDeleteUserDialog: usersUIEvents.openDeleteUserDialog,
    openDeleteUsersDialog: usersUIEvents.openDeleteUsersDialog,
    openFetchUsersDialog: usersUIEvents.openFetchUsersDialog,
    goUsersPage: usersUIEvents.goUsersPage,
    openUpdateUsersStatusDialog: usersUIEvents.openUpdateUsersStatusDialog,
  };

  return (
    <UsersUIContext.Provider value={value}>{children}</UsersUIContext.Provider>
  );
}
