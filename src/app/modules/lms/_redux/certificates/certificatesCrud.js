import axios from "axios";

export const MESSAGES_URL = "/certificates";

// CREATE =>  POST: add a new certificate to the server
export function createCertificate(certificate) {
  return axios.post(MESSAGES_URL, { certificate });
}

// READ
export function getAllCertificates() {
  return axios.get(MESSAGES_URL);
}

export function getCertificateById(certificateId) {
  return axios.get(`${MESSAGES_URL}/${certificateId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCertificates(queryParams) {
  return axios.post(`${MESSAGES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the certificate on the server
export function updateCertificate(certificate) {
  return axios.put(`${MESSAGES_URL}/${certificate.Id}`, { certificate });
}

// UPDATE Status
export function updateStatusForCertificates(ids, status) {
  return axios.post(`${MESSAGES_URL}/updateStatusForCertificates`, {
    ids,
    status,
  });
}

// DELETE => delete the certificate from the server
export function deleteCertificate(certificateId) {
  return axios.delete(`${MESSAGES_URL}/${certificateId}`);
}

// DELETE Certificates by ids
export function deleteCertificates(ids) {
  return axios.post(`${MESSAGES_URL}/deleteCertificates`, { ids });
}
