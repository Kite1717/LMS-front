import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./CourseLibraryCategoriesUIHelpers";

const CourseLibraryCategoriesUIContext = createContext();

export function useCourseLibraryCategoriesUIContext() {
  return useContext(CourseLibraryCategoriesUIContext);
}

export const CourseLibraryCategoriesUIConsumer =
  CourseLibraryCategoriesUIContext.Consumer;

export function CourseLibraryCategoriesUIProvider({
  courseLibraryCategoriesUIEvents,
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

  const initCourseLibraryCategory = {
    Id: undefined,
    Code: "",
    StartDay: "",
    EndDay: "",
    File: "",
    CourseId: 1,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initCourseLibraryCategory,
    newCourseLibraryCategoryButtonClick:
      courseLibraryCategoriesUIEvents.newCourseLibraryCategoryButtonClick,
    openEditCourseLibraryCategoryDialog:
      courseLibraryCategoriesUIEvents.openEditCourseLibraryCategoryDialog,
    openAssignCourseLibraryCategoryDialog:
      courseLibraryCategoriesUIEvents.openAssignCourseLibraryCategoryDialog,
    openDeleteCourseLibraryCategoryDialog:
      courseLibraryCategoriesUIEvents.openDeleteCourseLibraryCategoryDialog,
    openDeleteCourseLibraryCategoriesDialog:
      courseLibraryCategoriesUIEvents.openDeleteCourseLibraryCategoriesDialog,
    openFetchCourseLibraryCategoriesDialog:
      courseLibraryCategoriesUIEvents.openFetchCourseLibraryCategoriesDialog,
    goLibraryPage: courseLibraryCategoriesUIEvents.goLibraryPage,
    openUpdateCourseLibraryCategoriesStatusDialog:
      courseLibraryCategoriesUIEvents.openUpdateCourseLibraryCategoriesStatusDialog,
    newLibraryButtonClick:
      courseLibraryCategoriesUIEvents.newLibraryButtonClick,
  };

  return (
    <CourseLibraryCategoriesUIContext.Provider value={value}>
      {children}
    </CourseLibraryCategoriesUIContext.Provider>
  );
}
