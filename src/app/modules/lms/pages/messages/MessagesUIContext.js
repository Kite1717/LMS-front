import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./MessagesUIHelpers";

const MessagesUIContext = createContext();

export function useMessagesUIContext() {
  return useContext(MessagesUIContext);
}

export const MessagesUIConsumer = MessagesUIContext.Consumer;

export function MessagesUIProvider({ messagesUIEvents, children }) {
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

  const initMessage = {
    Id: undefined,
    FromUserId: "",
    ToUserId: null,
    Text: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initMessage,
    newMessageButtonClick: messagesUIEvents.newMessageButtonClick,
    openEditMessageDialog: messagesUIEvents.openEditMessageDialog,
    openAssignMessageDialog: messagesUIEvents.openAssignMessageDialog,
    openDeleteMessageDialog: messagesUIEvents.openDeleteMessageDialog,
    openDeleteMessagesDialog: messagesUIEvents.openDeleteMessagesDialog,
    openFetchMessagesDialog: messagesUIEvents.openFetchMessagesDialog,
    goTopicsPage: messagesUIEvents.goTopicsPage,
    openUpdateMessagesStatusDialog:
      messagesUIEvents.openUpdateMessagesStatusDialog,
  };

  return (
    <MessagesUIContext.Provider value={value}>
      {children}
    </MessagesUIContext.Provider>
  );
}
