import * as requestFromServer from "./usersCrud";
import { usersSlice, callTypes } from "./usersSlice";

const { actions } = usersSlice;

export const fetchUsers = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  console.log("fetchUsers -> queryParams", queryParams);

  return requestFromServer
    .findUsers(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.usersFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find users";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const setSelectedUser = (userId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setUser({ userId }));
};

export const fetchUserTag = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getUserTags(id)
    .then((response) => {
      const { data } = response;
      dispatch(actions.usersTagsFetched({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find users";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchMessageUsers = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getMessagesUsers()
    .then((response) => {
      const { data } = response;

      console.log(data);
      dispatch(actions.userForMessagesFetched({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find users";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchUser = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.userFetched({ userForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getUserById(id)
    .then((response) => {
      const user = response.data;
      dispatch(actions.userFetched({ userForEdit: user }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteUser = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUser(id)
    .then((response) => {
      dispatch(actions.userDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createUser = (userForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createUser(userForCreation)
    .then((response) => {
      const { user } = response.data;
      dispatch(actions.userCreated({ user }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createBulkFile = (bulkFileForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createBulkFile(bulkFileForCreation)
    .then((response) => {
      console.log("createBulkFile -> response", response);

      const { bulkFile } = response.data;
      dispatch(actions.bulkFileCreated({ bulkFile }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create question";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateUser = (user) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateUser(user)
    .then(() => {
      dispatch(actions.userUpdated({ user }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateUsersStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForUsers(ids, status)
    .then(() => {
      dispatch(actions.usersStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update users status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteUsers = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUsers(ids)
    .then(() => {
      dispatch(actions.usersDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete users";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
