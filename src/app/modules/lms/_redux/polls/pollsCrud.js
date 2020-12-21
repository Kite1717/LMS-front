import axios from "axios";

export const COURSES_URL = "/surveys";

// CREATE =>  POST: add a new poll to the server
export function createPoll(poll) {
  return axios.post(COURSES_URL, { poll });
}

// READ
export function getAllPolls() {
  return axios.get(COURSES_URL);
}

export function getPollById(pollId) {
  return axios.get(`${COURSES_URL}/${pollId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findPolls(queryParams) {
  return axios.post(`${COURSES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the poll on the server
export function updatePoll(poll) {
  return axios.put(`${COURSES_URL}/${poll.Id}`, { poll });
}

// UPDATE Status
export function updateStatusForPolls(ids, status) {
  return axios.post(`${COURSES_URL}/updateStatusForPolls`, {
    ids,
    status,
  });
}

// DELETE => delete the poll from the server
export function deletePoll(pollId) {
  return axios.delete(`${COURSES_URL}/${pollId}`);
}

// DELETE Polls by ids
export function deletePolls(ids) {
  return axios.post(`${COURSES_URL}/deletePolls`, { ids });
}
