import axios from "axios";

export const COURSES_URL = "/documents";

// CREATE =>  POST: add a new qualityDocumentFile to the server
export function createQualityDocumentFile(qualityDocumentFile) {
  return axios.post(COURSES_URL, { qualityDocumentFile });
}

// READ
export function getAllQualityDocumentFiles() {
  return axios.get(COURSES_URL);
}

export function getQualityDocumentFileById(qualityDocumentFileId) {
  return axios.get(`${COURSES_URL}/${qualityDocumentFileId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findQualityDocumentFiles(queryParams) {
  return axios.post(`${COURSES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the qualityDocumentFile on the server
export function updateQualityDocumentFile(qualityDocumentFile) {
  return axios.put(`${COURSES_URL}/${qualityDocumentFile.Id}`, {
    qualityDocumentFile,
  });
}

// UPDATE Status
export function updateStatusForQualityDocumentFiles(ids, status) {
  return axios.post(`${COURSES_URL}/updateStatusForQualityDocumentFiles`, {
    ids,
    status,
  });
}

// DELETE => delete the qualityDocumentFile from the server
export function deleteQualityDocumentFile(qualityDocumentFileId) {
  return axios.delete(`${COURSES_URL}/${qualityDocumentFileId}`);
}

// DELETE QualityDocumentFiles by ids
export function deleteQualityDocumentFiles(ids) {
  return axios.post(`${COURSES_URL}/deleteQualityDocumentFiles`, { ids });
}
