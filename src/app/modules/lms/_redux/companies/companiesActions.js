import * as requestFromServer from "./companiesCrud";
import { companiesSlice, callTypes } from "./companiesSlice";

const { actions } = companiesSlice;

export const setSelectedCompany = (companyId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setCompany({ companyId }));
};

export const fetchAllCompanies = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllCompanies()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.companiesAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find companies";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCompanies = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCompanies(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.companiesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find companies";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCompaniesTags = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllCompaniesTags()
    .then((response) => {
      const { data } = response;
      dispatch(actions.companiesAllTagsFetched({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find companies";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCompany = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.companyFetched({ companyForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCompanyById(id)
    .then((response) => {
      const company = response.data;
      dispatch(actions.companyFetched({ companyForEdit: company }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find company";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCompany = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCompany(id)
    .then((response) => {
      dispatch(actions.companyDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete company";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCompany = (companyForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCompany(companyForCreation)
    .then((response) => {
      const company = response.data;
      dispatch(actions.companyCreated({ company }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create company";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCompany = (company) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCompany(company)
    .then(() => {
      dispatch(actions.companyUpdated({ company }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update company";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCompaniesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCompanies(ids, status)
    .then(() => {
      dispatch(actions.companiesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update companies status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCompanies = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCompanies(ids)
    .then(() => {
      dispatch(actions.companiesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete companies";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
