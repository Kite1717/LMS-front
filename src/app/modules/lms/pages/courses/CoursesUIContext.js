import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./CoursesUIHelpers";

const CoursesUIContext = createContext();

export function useCoursesUIContext() {
  return useContext(CoursesUIContext);
}

export const CoursesUIConsumer = CoursesUIContext.Consumer;

export function CoursesUIProvider({ coursesUIEvents, children }) {
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

  const initCourse = {
    Id: undefined,
    CoursePackageId: 0,
    Name: "",
    Description: "",
    Descr: "",
    Duration: 0,
    Price: 0,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initCourse,
    newCourseButtonClick: coursesUIEvents.newCourseButtonClick,
    openEditCourseDialog: coursesUIEvents.openEditCourseDialog,
    openAssignCourseDialog: coursesUIEvents.openAssignCourseDialog,
    openDeleteCourseDialog: coursesUIEvents.openDeleteCourseDialog,
    openDeleteCoursesDialog: coursesUIEvents.openDeleteCoursesDialog,
    openFetchCoursesDialog: coursesUIEvents.openFetchCoursesDialog,
    goTopicsPage: coursesUIEvents.goTopicsPage,
    goLibraryPage: coursesUIEvents.goLibraryPage,
    goLibraryCategoriesPage: coursesUIEvents.goLibraryCategoriesPage,
    goReportPage: coursesUIEvents.goReportPage,
    goSurveysPage: coursesUIEvents.goSurveysPage,
    goQuestionBanksPage: coursesUIEvents.goQuestionBanksPage,
    openUpdateCoursesStatusDialog:
      coursesUIEvents.openUpdateCoursesStatusDialog,
  };

  return (
    <CoursesUIContext.Provider value={value}>
      {children}
    </CoursesUIContext.Provider>
  );
}
