import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UserMessagesUIHelpers";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const UserMessagesUIContext = createContext();

export function useUserMessagesUIContext() {
  return useContext(UserMessagesUIContext);
}

export const UserMessagesUIConsumer = UserMessagesUIContext.Consumer;

export function UserMessagesUIProvider({ userMessagesUIEvents, children }) {
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

  const { courseState } = useSelector(
    (state) => ({ courseState: state.courses }),
    shallowEqual
  );
  const { selectedUser } = courseState;

  const initUserMessage = {
    Id: undefined,
    UserId: selectedUser || 0,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initUserMessage,
    newUserMessageButtonClick: userMessagesUIEvents.newUserMessageButtonClick,
    openEditUserMessageDialog: userMessagesUIEvents.openEditUserMessageDialog,
    openDeleteUserMessageDialog:
      userMessagesUIEvents.openDeleteUserMessageDialog,
    openDeleteUserMessagesDialog:
      userMessagesUIEvents.openDeleteUserMessagesDialog,
    openFetchUserMessagesDialog:
      userMessagesUIEvents.openFetchUserMessagesDialog,
    goUserMessageSubjectsPage: userMessagesUIEvents.goUserMessageSubjectsPage,
    openUpdateUserMessagesStatusDialog:
      userMessagesUIEvents.openUpdateUserMessagesStatusDialog,
  };

  return (
    <UserMessagesUIContext.Provider value={value}>
      {children}
    </UserMessagesUIContext.Provider>
  );
}
