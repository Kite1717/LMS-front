import * as requestFromServer from "./certificatesCrud";
import { certificatesSlice, callTypes } from "./certificatesSlice";

const { actions } = certificatesSlice;

export const setSelectedCertificate = (certificateId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setCertificate({ certificateId }));
};

export const fetchAllCertificate = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllCertificates()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.certificatesAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientCertificate = "Can't find certificates";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCertificates = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCertificates(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.certificatesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientCertificate = "Can't find certificates";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCertificate = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.certificateFetched({ certificateForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCertificateById(id)
    .then((response) => {
      const certificate = response.data;
      dispatch(actions.certificateFetched({ certificateForEdit: certificate }));
    })
    .catch((error) => {
      error.clientCertificate = "Can't find certificate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCertificate = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCertificate(id)
    .then((response) => {
      dispatch(actions.certificateDeleted({ id }));
    })
    .catch((error) => {
      error.clientCertificate = "Can't delete certificate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCertificate = (certificateForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCertificate(certificateForCreation)
    .then((response) => {
      const certificate = response.data;
      dispatch(actions.certificateCreated({ certificate }));
    })
    .catch((error) => {
      error.clientCertificate = "Can't create certificate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCertificate = (certificate) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCertificate(certificate)
    .then(() => {
      dispatch(actions.certificateUpdated({ certificate }));
    })
    .catch((error) => {
      error.clientCertificate = "Can't update certificate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCertificatesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCertificates(ids, status)
    .then(() => {
      dispatch(actions.certificatesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientCertificate = "Can't update certificates status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCertificates = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCertificates(ids)
    .then(() => {
      dispatch(actions.certificatesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientCertificate = "Can't delete certificates";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
