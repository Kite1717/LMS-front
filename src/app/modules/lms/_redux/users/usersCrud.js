import axios from "axios";

export const USERS_URL = "/users";

// CREATE =>  POST: add a new user to the server
export function createUser(user) {
  return axios.post(USERS_URL, { user });
}

export function createBulkFile(bulkFile) {
  return axios.post("/bulk-files", { bulkFile });
}

// READ
export function getMessagesUsers() {
  return axios.get("/message-users");
}

export function getUserTags(id) {
  return axios.get("/users-tag");
}

export function getUserById(userId) {
  return axios.get(`${USERS_URL}/${userId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findUsers(queryParams) {
  return axios.post(`${USERS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the user on the server
export function updateUser(user) {
  return axios.put(`${USERS_URL}/${user.Id}`, { user });
}

// UPDATE Status
export function updateStatusForUsers(ids, status) {
  return axios.post(`${USERS_URL}/updateStatusForUsers`, {
    ids,
    status,
  });
}

// DELETE => delete the user from the server
export function deleteUser(userId) {
  return axios.delete(`${USERS_URL}/${userId}`);
}

// DELETE Users by ids
export function deleteUsers(ids) {
  return axios.post(`${USERS_URL}/deleteUsers`, { ids });
}
