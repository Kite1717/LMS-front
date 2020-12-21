import * as requestFromServer from "./coursePackagesCrud";
import { coursePackagesSlice, callTypes } from "./coursePackagesSlice";

const { actions } = coursePackagesSlice;

export const setSelectedCoursePackage = (coursePackageId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setCoursePackage({ coursePackageId }));
};

export const fetchAllCoursePackages = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllCoursePackages()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.coursePackagesAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find coursePackages";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCoursePackages = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCoursePackages(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.coursePackagesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find coursePackages";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCoursePackage = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.coursePackageFetched({ coursePackageForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCoursePackageById(id)
    .then((response) => {
      const coursePackage = response.data;
      dispatch(
        actions.coursePackageFetched({ coursePackageForEdit: coursePackage })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find coursePackage";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCoursePackage = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCoursePackage(id)
    .then((response) => {
      dispatch(actions.coursePackageDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete coursePackage";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCoursePackage = (coursePackageForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCoursePackage(coursePackageForCreation)
    .then((response) => {
      const coursePackage = response.data;
      dispatch(actions.coursePackageCreated({ coursePackage }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create coursePackage";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCoursePackage = (coursePackage) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCoursePackage(coursePackage)
    .then(() => {
      dispatch(actions.coursePackageUpdated({ coursePackage }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update coursePackage";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCoursePackagesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCoursePackages(ids, status)
    .then(() => {
      dispatch(actions.coursePackagesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update coursePackages status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCoursePackages = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCoursePackages(ids)
    .then(() => {
      dispatch(actions.coursePackagesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete coursePackages";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
