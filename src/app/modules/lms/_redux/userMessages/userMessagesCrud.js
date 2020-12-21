import axios from "axios";

export const MESSAGES_URL = "/user-message";

// CREATE =>  POST: add a new userMessage to the server
export function createUserMessage(userMessage) {
  return axios.post(MESSAGES_URL, { userMessage });
}

// READ
export function getAllUserMessages() {
  return axios.get(MESSAGES_URL);
}

export function getUserMessageById(userMessageId) {
  return axios.get(`${MESSAGES_URL}/${userMessageId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findUserMessages(queryParams) {
  return axios.post(`${MESSAGES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the userMessage on the server
export function updateUserMessage(userMessage) {
  return axios.put(`${MESSAGES_URL}/${userMessage.Id}`, { userMessage });
}

// UPDATE Status
export function updateStatusForUserMessages(ids, status) {
  return axios.post(`${MESSAGES_URL}/updateStatusForUserMessages`, {
    ids,
    status,
  });
}

// DELETE => delete the userMessage from the server
export function deleteUserMessage(userMessageId) {
  return axios.delete(`${MESSAGES_URL}/${userMessageId}`);
}

// DELETE UserMessages by ids
export function deleteUserMessages(ids) {
  return axios.post(`${MESSAGES_URL}/deleteUserMessages`, { ids });
}
