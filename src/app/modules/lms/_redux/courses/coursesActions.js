import * as requestFromServer from "./coursesCrud";
import { coursesSlice, callTypes } from "./coursesSlice";

const { actions } = coursesSlice;

export const setSelectedCourse = (courseId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setCourse({ courseId }));
};

export const fetchAllCourses = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllCourses()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.coursesAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find courses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCourses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCourses(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.coursesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find courses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCourse = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.courseFetched({ courseForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCourseById(id)
    .then((response) => {
      const course = response.data;
      dispatch(actions.courseFetched({ courseForEdit: course }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find course";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCourse = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCourse(id)
    .then((response) => {
      dispatch(actions.courseDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete course";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCourse = (courseForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCourse(courseForCreation)
    .then((response) => {
      const course = response.data;
      dispatch(actions.courseCreated({ course }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create course";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCourse = (course) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCourse(course)
    .then((response) => {
      const course = response.data;
      dispatch(actions.courseUpdated({ course }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update course";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCoursesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCourses(ids, status)
    .then(() => {
      dispatch(actions.coursesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update courses status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCourses = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCourses(ids)
    .then(() => {
      dispatch(actions.coursesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete courses";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
