import axios from "axios";

export const MESSAGES_URL = "/helps";

// CREATE =>  POST: add a new help to the server
export function createHelp(help) {
  return axios.post(MESSAGES_URL, { help });
}

// READ
export function getAllHelps() {
  return axios.get(MESSAGES_URL);
}

export function getHelpById(helpId) {
  return axios.get(`${MESSAGES_URL}/${helpId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findHelps(queryParams) {
  return axios.post(`${MESSAGES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the help on the server
export function updateHelp(help) {
  return axios.put(`${MESSAGES_URL}/${help.Id}`, { help });
}

// UPDATE Status
export function updateStatusForHelps(ids, status) {
  return axios.post(`${MESSAGES_URL}/updateStatusForHelps`, {
    ids,
    status,
  });
}

// DELETE => delete the help from the server
export function deleteHelp(helpId) {
  return axios.delete(`${MESSAGES_URL}/${helpId}`);
}

// DELETE Helps by ids
export function deleteHelps(ids) {
  return axios.post(`${MESSAGES_URL}/deleteHelps`, { ids });
}
