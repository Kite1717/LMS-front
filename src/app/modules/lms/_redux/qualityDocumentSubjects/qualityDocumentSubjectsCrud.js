import axios from "axios";

export const TOPICS_URL = "/document-sub-categories";

// CREATE =>  POST: add a new qualityDocumentSubject to the server
export function createQualityDocumentSubject(qualityDocumentSubject) {
  return axios.post(TOPICS_URL, { qualityDocumentSubject });
}

// READ
export function getAllQualityDocumentSubjects() {
  return axios.get(TOPICS_URL);
}

export function getByQualityDocumentSubjectsSubjectId(courseId) {
  return axios.get(`${TOPICS_URL}/category/${courseId}`);
}

export function getQualityDocumentSubjectById(qualityDocumentSubjectId) {
  return axios.get(`${TOPICS_URL}/${qualityDocumentSubjectId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findQualityDocumentSubjects(queryParams) {
  return axios.post(`${TOPICS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the qualityDocumentSubject on the server
export function updateQualityDocumentSubject(qualityDocumentSubject) {
  return axios.put(`${TOPICS_URL}/${qualityDocumentSubject.Id}`, {
    qualityDocumentSubject,
  });
}

// UPDATE Status
export function updateStatusForQualityDocumentSubjects(ids, status) {
  return axios.post(`${TOPICS_URL}/updateStatusForQualityDocumentSubjects`, {
    ids,
    status,
  });
}

// DELETE => delete the qualityDocumentSubject from the server
export function deleteQualityDocumentSubject(qualityDocumentSubjectId) {
  return axios.delete(`${TOPICS_URL}/${qualityDocumentSubjectId}`);
}

// DELETE QualityDocumentSubjects by ids
export function deleteQualityDocumentSubjects(ids) {
  return axios.post(`${TOPICS_URL}/deleteQualityDocumentSubjects`, { ids });
}
