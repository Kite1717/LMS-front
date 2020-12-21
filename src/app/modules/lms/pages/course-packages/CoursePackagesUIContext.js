import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./CoursePackagesUIHelpers";

const CoursePackagesUIContext = createContext();

export function useCoursePackagesUIContext() {
  return useContext(CoursePackagesUIContext);
}

export const CoursePackagesUIConsumer = CoursePackagesUIContext.Consumer;

export function CoursePackagesUIProvider({ coursePackagesUIEvents, children }) {
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

  const initCoursePackage = {
    Id: undefined,
    Name: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initCoursePackage,
    newCoursePackageButtonClick:
      coursePackagesUIEvents.newCoursePackageButtonClick,
    openEditCoursePackageDialog:
      coursePackagesUIEvents.openEditCoursePackageDialog,
    openDeleteCoursePackageDialog:
      coursePackagesUIEvents.openDeleteCoursePackageDialog,
    openDeleteCoursePackagesDialog:
      coursePackagesUIEvents.openDeleteCoursePackagesDialog,
    openFetchCoursePackagesDialog:
      coursePackagesUIEvents.openFetchCoursePackagesDialog,
    goUsersPage: coursePackagesUIEvents.goUsersPage,
    openUpdateCoursePackagesStatusDialog:
      coursePackagesUIEvents.openUpdateCoursePackagesStatusDialog,
    openCoursePackageAssignDialog:
      coursePackagesUIEvents.openCoursePackageAssignDialog,
  };

  return (
    <CoursePackagesUIContext.Provider value={value}>
      {children}
    </CoursePackagesUIContext.Provider>
  );
}
