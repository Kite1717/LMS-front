import * as requestFromServer from "./meetingUsersCrud";
import { meetingUsersSlice, callTypes } from "./meetingUsersSlice";

const { actions } = meetingUsersSlice;

export const setSelectedMeetingUser = (meetingUserId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setMeetingUser({ meetingUserId }));
};

export const fetchAllMeetingUsers = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllMeetingUsers()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.meetingUsersAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find meetingUsers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchMeetingUsersTagByTopicId = (topicid) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getMeetingUsersTagByTopicId(topicid)
    .then((response) => {
      const entities = response.data;
      dispatch(actions.meetingUsersTagFetchedByTopicId({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find meetingUsers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchMeetingUsers = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findMeetingUsers(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.meetingUsersFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find meetingUsers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchMeetingUser = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.meetingUserFetched({ meetingUserForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getMeetingUserById(id)
    .then((response) => {
      const meetingUser = response.data;
      dispatch(actions.meetingUserFetched({ meetingUserForEdit: meetingUser }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find meetingUser";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteMeetingUser = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMeetingUser(id)
    .then((response) => {
      dispatch(actions.meetingUserDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete meetingUser";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createMeetingUser = (meetingUserForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createMeetingUser(meetingUserForCreation)
    .then((response) => {
      const { meetingUser } = response.data;
      dispatch(actions.meetingUserCreated({ meetingUser }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create meetingUser";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateMeetingUser = (meetingUser) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateMeetingUser(meetingUser)
    .then(() => {
      dispatch(actions.meetingUserUpdated({ meetingUser }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update meetingUser";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateMeetingUsersStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForMeetingUsers(ids, status)
    .then(() => {
      dispatch(actions.meetingUsersStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update meetingUsers status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteMeetingUsers = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMeetingUsers(ids)
    .then(() => {
      dispatch(actions.meetingUsersDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete meetingUsers";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
