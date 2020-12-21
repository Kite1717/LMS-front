import * as requestFromServer from "./coursPackageCompaniesCrud";
import {
  coursePackageCompaniesSlice,
  callTypes,
} from "./coursePackageCompaniesSlice";

const { actions } = coursePackageCompaniesSlice;

export const setSelectedCoursePackageCompany = (coursePackageCompanyId) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setCoursePackageCompany({ coursePackageCompanyId }));
};

export const fetchAllCoursePackageCompanies = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllCoursePackageCompanies()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.coursePackageCompaniesAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find coursePackageCompanies";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCoursePackageCompanies = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCoursePackageCompanies(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.coursePackageCompaniesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find coursePackageCompanies";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCoursePackageCompany = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.coursePackageCompanyFetched({
        coursePackageCompanyForEdit: undefined,
      })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCoursePackageCompanyById(id)
    .then((response) => {
      const coursePackageCompany = response.data;
      dispatch(
        actions.coursePackageCompanyFetched({
          coursePackageCompanyForEdit: coursePackageCompany,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find coursePackageCompany";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCoursePackageCompany = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCoursePackageCompany(id)
    .then((response) => {
      dispatch(actions.coursePackageCompanyDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete coursePackageCompany";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCoursePackageCompany = (coursePackageCompanyForCreation) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCoursePackageCompany(coursePackageCompanyForCreation)
    .then((response) => {
      const coursePackageCompany = response.data;
      dispatch(actions.coursePackageCompanyCreated({ coursePackageCompany }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create coursePackageCompany";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCoursePackageCompany = (coursePackageCompany) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCoursePackageCompany(coursePackageCompany)
    .then(() => {
      dispatch(actions.coursePackageCompanyUpdated({ coursePackageCompany }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update coursePackageCompany";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCoursePackageCompaniesStatus = (ids, status) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCoursePackageCompanies(ids, status)
    .then(() => {
      dispatch(actions.coursePackageCompaniesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update coursePackageCompanies status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCoursePackageCompanies = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCoursePackageCompanies(ids)
    .then(() => {
      dispatch(actions.coursePackageCompaniesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete coursePackageCompanies";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
