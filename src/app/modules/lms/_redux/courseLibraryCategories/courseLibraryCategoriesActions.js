import * as requestFromServer from "./courseLibraryCategoriesCrud";
import {
  courseLibraryCategoriesSlice,
  callTypes,
} from "./courseLibraryCategoriesSlice";

const { actions } = courseLibraryCategoriesSlice;

export const setSelectedCourseLibraryCategory = (courseLibraryCategoryId) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(
    actions.setCourseLibraryCategory({ courseLibraryCategoryId })
  );
};

export const fetchAllCourseLibraryCategories = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllCourseLibraryCategories()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.courseLibraryCategoriesAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find courseLibraryCategories";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCourseLibraryCategories = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCourseLibraryCategories(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(
        actions.courseLibraryCategoriesFetched({ totalCount, entities })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find courseLibraryCategories";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCourseLibraryCategory = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.courseLibraryCategoryFetched({
        courseLibraryCategoryForEdit: undefined,
      })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCourseLibraryCategoryById(id)
    .then((response) => {
      const courseLibraryCategory = response.data;
      dispatch(
        actions.courseLibraryCategoryFetched({
          courseLibraryCategoryForEdit: courseLibraryCategory,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find courseLibraryCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCourseLibraryCategory = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCourseLibraryCategory(id)
    .then((response) => {
      dispatch(actions.courseLibraryCategoryDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete courseLibraryCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCourseLibraryCategory = (
  courseLibraryCategoryForCreation
) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCourseLibraryCategory(courseLibraryCategoryForCreation)
    .then((response) => {
      const courseLibraryCategory = response.data;
      dispatch(actions.courseLibraryCategoryCreated({ courseLibraryCategory }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create courseLibraryCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const fetchCourseLibraryCategoriesTag = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getCourseLibraryCategoriesTags(id)
    .then((response) => {
      const { data } = response;
      dispatch(actions.courseLibraryCategoriesTagsFetched({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find users";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const updateCourseLibraryCategory = (courseLibraryCategory) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCourseLibraryCategory(courseLibraryCategory)
    .then(() => {
      dispatch(actions.courseLibraryCategoryUpdated({ courseLibraryCategory }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update courseLibraryCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCourseLibraryCategoriesStatus = (ids, status) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCourseLibraryCategories(ids, status)
    .then(() => {
      dispatch(actions.courseLibraryCategoriesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update courseLibraryCategories status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCourseLibraryCategories = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCourseLibraryCategories(ids)
    .then(() => {
      dispatch(actions.courseLibraryCategoriesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete courseLibraryCategories";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
