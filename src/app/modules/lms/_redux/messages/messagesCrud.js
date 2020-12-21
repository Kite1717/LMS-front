import axios from "axios";

export const MESSAGES_URL = "/messages";

// CREATE =>  POST: add a new message to the server
export function createMessage(message) {
  return axios.post(MESSAGES_URL, { message });
}

// READ
export function getAllMessages() {
  return axios.get(MESSAGES_URL);
}

export function getMessageById(messageId) {
  return axios.get(`${MESSAGES_URL}/${messageId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findMessages(queryParams) {
  return axios.post(`${MESSAGES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the message on the server
export function updateMessage(message) {
  return axios.put(`${MESSAGES_URL}/${message.Id}`, { message });
}

// UPDATE Status
export function updateStatusForMessages(ids, status) {
  return axios.post(`${MESSAGES_URL}/updateStatusForMessages`, {
    ids,
    status,
  });
}

// DELETE => delete the message from the server
export function deleteMessage(messageId) {
  return axios.delete(`${MESSAGES_URL}/${messageId}`);
}

// DELETE Messages by ids
export function deleteMessages(ids) {
  return axios.post(`${MESSAGES_URL}/deleteMessages`, { ids });
}
