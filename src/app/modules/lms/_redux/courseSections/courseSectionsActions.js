import * as requestFromServer from "./courseSectionsCrud";
import { courseSectionsSlice, callTypes } from "./courseSectionsSlice";

const { actions } = courseSectionsSlice;

export const setSelectedCourseSection = (courseSectionId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setCourseSection({ courseSectionId }));
};

export const fetchAllCourseSections = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllCourseSections()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.courseSectionsAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find courseSections";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCourseSections = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCourseSections(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.courseSectionsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find courseSections";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCourseSection = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.courseSectionFetched({ courseSectionForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCourseSectionById(id)
    .then((response) => {
      const courseSection = response.data;
      dispatch(
        actions.courseSectionFetched({ courseSectionForEdit: courseSection })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find courseSection";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCourseSection = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCourseSection(id)
    .then((response) => {
      dispatch(actions.courseSectionDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete courseSection";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCourseSection = (courseSectionForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCourseSection(courseSectionForCreation)
    .then((response) => {
      const { courseSection } = response.data;
      dispatch(actions.courseSectionCreated({ courseSection }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create courseSection";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCourseSection = (courseSection) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCourseSection(courseSection)
    .then(() => {
      dispatch(actions.courseSectionUpdated({ courseSection }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update courseSection";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCourseSectionsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCourseSections(ids, status)
    .then(() => {
      dispatch(actions.courseSectionsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update courseSections status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCourseSections = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCourseSections(ids)
    .then(() => {
      dispatch(actions.courseSectionsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete courseSections";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
