import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./CoursePackageCompaniesUIHelpers";

const CoursePackageCompaniesUIContext = createContext();

export function useCoursePackageCompaniesUIContext() {
  return useContext(CoursePackageCompaniesUIContext);
}

export const CoursePackageCompaniesUIConsumer =
  CoursePackageCompaniesUIContext.Consumer;

export function CoursePackageCompaniesUIProvider({
  coursePackageCompaniesUIEvents,
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

  const initCoursePackageCompany = {
    Id: undefined,
    Name: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initCoursePackageCompany,
    newCoursePackageCompanyButtonClick:
      coursePackageCompaniesUIEvents.newCoursePackageCompanyButtonClick,
    openEditCoursePackageCompanyDialog:
      coursePackageCompaniesUIEvents.openEditCoursePackageCompanyDialog,
    openAssignCoursePackageCompanyDialog:
      coursePackageCompaniesUIEvents.openAssignCoursePackageCompanyDialog,
    openDeleteCoursePackageCompanyDialog:
      coursePackageCompaniesUIEvents.openDeleteCoursePackageCompanyDialog,
    openDeleteCoursePackageCompaniesDialog:
      coursePackageCompaniesUIEvents.openDeleteCoursePackageCompaniesDialog,
    openFetchCoursePackageCompaniesDialog:
      coursePackageCompaniesUIEvents.openFetchCoursePackageCompaniesDialog,
    goTopicsPage: coursePackageCompaniesUIEvents.goTopicsPage,
    openUpdateCoursePackageCompaniesStatusDialog:
      coursePackageCompaniesUIEvents.openUpdateCoursePackageCompaniesStatusDialog,
  };

  return (
    <CoursePackageCompaniesUIContext.Provider value={value}>
      {children}
    </CoursePackageCompaniesUIContext.Provider>
  );
}
