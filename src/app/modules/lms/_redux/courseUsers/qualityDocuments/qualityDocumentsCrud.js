import axios from "axios";

export const COURSES_URL = "/document-categories";

// CREATE =>  POST: add a new qualityDocument to the server
export function createQualityDocument(qualityDocument) {
  return axios.post(COURSES_URL, { qualityDocument });
}

// READ
export function getAllQualityDocuments() {
  return axios.get(COURSES_URL);
}

export function getQualityDocumentById(qualityDocumentId) {
  return axios.get(`${COURSES_URL}/${qualityDocumentId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findQualityDocuments(queryParams) {
  return axios.post(`${COURSES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the qualityDocument on the server
export function updateQualityDocument(qualityDocument) {
  return axios.put(`${COURSES_URL}/${qualityDocument.Id}`, { qualityDocument });
}

// UPDATE Status
export function updateStatusForQualityDocuments(ids, status) {
  return axios.post(`${COURSES_URL}/updateStatusForQualityDocuments`, {
    ids,
    status,
  });
}

// DELETE => delete the qualityDocument from the server
export function deleteQualityDocument(qualityDocumentId) {
  return axios.delete(`${COURSES_URL}/${qualityDocumentId}`);
}

// DELETE QualityDocuments by ids
export function deleteQualityDocuments(ids) {
  return axios.post(`${COURSES_URL}/deleteQualityDocuments`, { ids });
}
