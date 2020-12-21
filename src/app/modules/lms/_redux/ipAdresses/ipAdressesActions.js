import * as requestFromServer from "./ipAdressesCrud";
import { ipAdressesSlice, callTypes } from "./ipAdressesSlice";

const { actions } = ipAdressesSlice;

export const setSelectedIpAdress = (ipAdressId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setIpAdress({ ipAdressId }));
};

export const fetchAllIpAdresses = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllIpAdresses()
    .then((response) => {
      const entities = response.data;

      dispatch(actions.ipAdressesAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find ipAdresses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchIpAdresses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findIpAdresses(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.ipAdressesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find ipAdresses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchIpAdress = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.ipAdressFetched({ ipAdressForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getIpAdressById(id)
    .then((response) => {
      const ipAdress = response.data;
      dispatch(
        actions.ipAdressFetched({
          ipAdressForEdit: ipAdress,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find ipAdress";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteIpAdress = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteIpAdress(id)
    .then((response) => {
      dispatch(actions.ipAdressDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete ipAdress";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createIpAdress = (ipAdressForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createIpAdress(ipAdressForCreation)
    .then((response) => {
      const ipAdress = response.data;
      dispatch(actions.ipAdressCreated({ ipAdress }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create ipAdress";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateIpAdress = (ipAdress) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateIpAdress(ipAdress)
    .then(() => {
      dispatch(actions.ipAdressUpdated({ ipAdress }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update ipAdress";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateIpAdressesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForIpAdresses(ids, status)
    .then(() => {
      dispatch(actions.ipAdressesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update ipAdresses status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteIpAdresses = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteIpAdresses(ids)
    .then(() => {
      dispatch(actions.ipAdressesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete ipAdresses";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
