import * as requestFromServer from "./pollGroupsCrud";
import { pollGroupsSlice, callTypes } from "./pollGroupsSlice";

const { actions } = pollGroupsSlice;

export const setSelectedPollGroup = (pollGroupId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setPollGroup({ pollGroupId }));
};

export const fetchAllPollGroups = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllPollGroups()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.pollGroupsAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find pollGroups";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchPollGroupsByCourseId = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getByPollGroupsCourseId(id)
    .then((response) => {
      const entities = response.data;
      console.log("fırıl fırıl", entities);
      dispatch(actions.pollGroupsFetchedByCourseId({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find pollGroups";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchPollGroups = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPollGroups(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      console.log("XDXDXDXD", entities);
      dispatch(actions.pollGroupsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find pollGroups";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchPollGroup = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.pollGroupFetched({ pollGroupForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPollGroupById(id)
    .then((response) => {
      const pollGroup = response.data;
      dispatch(actions.pollGroupFetched({ pollGroupForEdit: pollGroup }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find pollGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePollGroup = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(id);
  return requestFromServer
    .deletePollGroup(id)
    .then((response) => {
      dispatch(actions.pollGroupDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete pollGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createPollGroup = (pollGroupForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPollGroup(pollGroupForCreation)
    .then((response) => {
      const { pollGroup } = response.data;
      dispatch(actions.pollGroupCreated({ pollGroup }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create pollGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePollGroup = (pollGroup) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePollGroup(pollGroup)
    .then(() => {
      dispatch(actions.pollGroupUpdated({ pollGroup }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update pollGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePollGroupsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPollGroups(ids, status)
    .then(() => {
      dispatch(actions.pollGroupsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update pollGroups status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePollGroups = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePollGroups(ids)
    .then(() => {
      dispatch(actions.pollGroupsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete pollGroups";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
