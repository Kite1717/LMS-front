import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./CourseSectionsUIHelpers";

const CourseSectionsUIContext = createContext();

export function useCourseSectionsUIContext() {
  return useContext(CourseSectionsUIContext);
}

export const CourseSectionsUIConsumer = CourseSectionsUIContext.Consumer;

export function CourseSectionsUIProvider({ courseSectionsUIEvents, children }) {
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

  const initCourseSection = {
    Id: undefined,
    Name: "",
    FileOrUrl: "",
    CourseTypeId: 1,
    TopicId: 0,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initCourseSection,
    newCourseSectionButtonClick:
      courseSectionsUIEvents.newCourseSectionButtonClick,
    openEditCourseSectionDialog:
      courseSectionsUIEvents.openEditCourseSectionDialog,
    openDeleteCourseSectionDialog:
      courseSectionsUIEvents.openDeleteCourseSectionDialog,
    openDeleteCourseSectionsDialog:
      courseSectionsUIEvents.openDeleteCourseSectionsDialog,
    openFetchCourseSectionsDialog:
      courseSectionsUIEvents.openFetchCourseSectionsDialog,
    goCourseSectionsPage: courseSectionsUIEvents.goCourseSectionsPage,
    openUpdateCourseSectionsStatusDialog:
      courseSectionsUIEvents.openUpdateCourseSectionsStatusDialog,
    
  };

  return (
    <CourseSectionsUIContext.Provider value={value}>
      {children}
    </CourseSectionsUIContext.Provider>
  );
}
