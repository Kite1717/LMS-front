import * as requestFromServer from "./topicsCrud";
import { topicsSlice, callTypes } from "./topicsSlice";

const { actions } = topicsSlice;

export const setSelectedTopic = (topicId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setTopic({ topicId }));
};

export const fetchAllTopics = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllTopics()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.topicsAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find topics";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchTopicsByCourseId = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getByTopicsCourseId(id)
    .then((response) => {
      const entities = response.data;
      console.log("fırıl fırıl", entities);
      dispatch(actions.topicsFetchedByCourseId({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find topics";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchTopics = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findTopics(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      console.log("XDXDXDXD", entities);
      dispatch(actions.topicsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find topics";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchTopic = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.topicFetched({ topicForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getTopicById(id)
    .then((response) => {
      const topic = response.data;
      dispatch(actions.topicFetched({ topicForEdit: topic }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find topic";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteTopic = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(id);
  return requestFromServer
    .deleteTopic(id)
    .then((response) => {
      dispatch(actions.topicDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete topic";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createTopic = (topicForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createTopic(topicForCreation)
    .then((response) => {
      const { topic } = response.data;
      dispatch(actions.topicCreated({ topic }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create topic";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateTopic = (topic) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateTopic(topic)
    .then(() => {
      dispatch(actions.topicUpdated({ topic }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update topic";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateTopicsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForTopics(ids, status)
    .then(() => {
      dispatch(actions.topicsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update topics status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteTopics = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteTopics(ids)
    .then(() => {
      dispatch(actions.topicsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete topics";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
