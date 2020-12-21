import * as requestFromServer from "./courseUsersCrud";
import { courseUsersSlice, callTypes } from "./courseUsersSlice";

const { actions } = courseUsersSlice;

export const setSelectedCourseUser = (courseUserId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setCourseUser({ courseUserId }));
};

export const fetchAllCourseUsers = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllCourseUsers()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.courseUsersAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find courseUsers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCourseUsersTagByTopicId = (topicid) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getCourseUsersTagByTopicId(topicid)
    .then((response) => {
      const entities = response.data;
      dispatch(actions.courseUsersTagFetchedByTopicId({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find courseUsers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCourseUsers = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCourseUsers(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.courseUsersFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find courseUsers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCourseUser = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.courseUserFetched({ courseUserForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCourseUserById(id)
    .then((response) => {
      const courseUser = response.data;
      dispatch(actions.courseUserFetched({ courseUserForEdit: courseUser }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find courseUser";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCourseUser = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCourseUser(id)
    .then((response) => {
      dispatch(actions.courseUserDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete courseUser";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCourseUser = (courseUserForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCourseUser(courseUserForCreation)
    .then((response) => {
      const { courseUser } = response.data;
      dispatch(actions.courseUserCreated({ courseUser }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create courseUser";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCourseUser = (courseUser) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCourseUser(courseUser)
    .then(() => {
      dispatch(actions.courseUserUpdated({ courseUser }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update courseUser";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCourseUsersStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCourseUsers(ids, status)
    .then(() => {
      dispatch(actions.courseUsersStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update courseUsers status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCourseUsers = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCourseUsers(ids)
    .then(() => {
      dispatch(actions.courseUsersDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete courseUsers";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
