import axios from "axios";

export const TOPICS_URL = "/topics";

// CREATE =>  POST: add a new topic to the server
export function createTopic(topic) {
  return axios.post(TOPICS_URL, { topic });
}

// READ
export function getAllTopics() {
  return axios.get(TOPICS_URL);
}

export function getByTopicsCourseId(courseId) {
  return axios.get(`${TOPICS_URL}/course/${courseId}`);
}

export function getTopicById(topicId) {
  return axios.get(`${TOPICS_URL}/${topicId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findTopics(queryParams) {
  return axios.post(`${TOPICS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the topic on the server
export function updateTopic(topic) {
  return axios.put(`${TOPICS_URL}/${topic.Id}`, { topic });
}

// UPDATE Status
export function updateStatusForTopics(ids, status) {
  return axios.post(`${TOPICS_URL}/updateStatusForTopics`, {
    ids,
    status,
  });
}

// DELETE => delete the topic from the server
export function deleteTopic(topicId) {
  return axios.delete(`${TOPICS_URL}/${topicId}`);
}

// DELETE Topics by ids
export function deleteTopics(ids) {
  return axios.post(`${TOPICS_URL}/deleteTopics`, { ids });
}
