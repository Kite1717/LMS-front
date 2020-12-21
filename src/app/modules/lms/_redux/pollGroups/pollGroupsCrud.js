import axios from "axios";

export const TOPICS_URL = "/survey-groups";

// CREATE =>  POST: add a new pollGroup to the server
export function createPollGroup(pollGroup) {
  return axios.post(TOPICS_URL, { pollGroup });
}

// READ
export function getAllPollGroups() {
  return axios.get(TOPICS_URL);
}

export function getByPollGroupsCourseId(courseId) {
  return axios.get(`${TOPICS_URL}/course/${courseId}`);
}

export function getPollGroupById(pollGroupId) {
  return axios.get(`${TOPICS_URL}/${pollGroupId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findPollGroups(queryParams) {
  return axios.post(`${TOPICS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the pollGroup on the server
export function updatePollGroup(pollGroup) {
  return axios.put(`${TOPICS_URL}/${pollGroup.Id}`, { pollGroup });
}

// UPDATE Status
export function updateStatusForPollGroups(ids, status) {
  return axios.post(`${TOPICS_URL}/updateStatusForPollGroups`, {
    ids,
    status,
  });
}

// DELETE => delete the pollGroup from the server
export function deletePollGroup(pollGroupId) {
  return axios.delete(`${TOPICS_URL}/${pollGroupId}`);
}

// DELETE PollGroups by ids
export function deletePollGroups(ids) {
  return axios.post(`${TOPICS_URL}/deletePollGroups`, { ids });
}
