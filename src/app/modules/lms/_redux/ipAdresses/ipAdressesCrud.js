import axios from "axios";

export const COURSES_URL = "/allowed-ips";

// CREATE =>  POST: add a new ipAdress to the server
export function createIpAdress(allowedIp) {
  return axios.post(COURSES_URL, { allowedIp });
}

// READ
export function getAllIpAdresses() {
  return axios.get(COURSES_URL);
}

export function getIpAdressById(ipAdressId) {
  return axios.get(`${COURSES_URL}/${ipAdressId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findIpAdresses(queryParams) {
  return axios.post(`${COURSES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the ipAdress on the server
export function updateIpAdress(allowedIp) {
  return axios.put(`${COURSES_URL}/${allowedIp.Id}`, { allowedIp });
}

// UPDATE Status
export function updateStatusForIpAdresses(ids, status) {
  return axios.post(`${COURSES_URL}/updateStatusForIpAdresses`, {
    ids,
    status,
  });
}

// DELETE => delete the ipAdress from the server
export function deleteIpAdress(ipAdressId) {
  return axios.delete(`${COURSES_URL}/${ipAdressId}`);
}

// DELETE IpAdresses by ids
export function deleteIpAdresses(ids) {
  return axios.post(`${COURSES_URL}/deleteIpAdresses`, { ids });
}
