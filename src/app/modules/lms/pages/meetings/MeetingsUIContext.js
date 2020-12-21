import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./MeetingsUIHelpers";

const MeetingsUIContext = createContext();

export function useMeetingsUIContext() {
  return useContext(MeetingsUIContext);
}

export const MeetingsUIConsumer = MeetingsUIContext.Consumer;

export function MeetingsUIProvider({ meetingsUIEvents, children }) {
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

  const initMeeting = {
    Id: undefined,
    CompanyId: 1,
    StartTime: "",
    EndTime: "",
    StartDate: "",
    EndDate: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initMeeting,
    newMeetingButtonClick: meetingsUIEvents.newMeetingButtonClick,
    openEditMeetingDialog: meetingsUIEvents.openEditMeetingDialog,
    openAssignMeetingDialog: meetingsUIEvents.openAssignMeetingDialog,
    openDeleteMeetingDialog: meetingsUIEvents.openDeleteMeetingDialog,
    openDeleteMeetingsDialog: meetingsUIEvents.openDeleteMeetingsDialog,
    openFetchMeetingsDialog: meetingsUIEvents.openFetchMeetingsDialog,
    goTopicsPage: meetingsUIEvents.goTopicsPage,
    goRollCallPage: meetingsUIEvents.goRollCallPage,
    goMeetingCalenderPage: meetingsUIEvents.goMeetingCalenderPage,
    openUpdateMeetingsStatusDialog:
      meetingsUIEvents.openUpdateMeetingsStatusDialog,
  };

  return (
    <MeetingsUIContext.Provider value={value}>
      {children}
    </MeetingsUIContext.Provider>
  );
}
