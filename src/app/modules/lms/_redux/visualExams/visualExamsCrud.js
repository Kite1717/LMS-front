import axios from "axios";

export const COURSES_URL = "/exams";

// CREATE =>  POST: add a new visualExam to the server
export function createVisualExam(exam) {
  return axios.post(COURSES_URL, { exam });
}

// READ
export function getAllVisualExams() {
  return axios.get(COURSES_URL);
}

export function getVisualExamById(visualExamId) {
  return axios.get(`${COURSES_URL}/${visualExamId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findVisualExams(queryParams) {
  return axios.post(`${COURSES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the visualExam on the server
export function updateVisualExam(exam) {


  return axios.put(`${COURSES_URL}/${exam.values.Id}`, { exam });
}

// UPDATE Status
export function updateStatusForVisualExams(ids, status) {
  return axios.post(`${COURSES_URL}/updateStatusForVisualExams`, {
    ids,
    status,
  });
}

// DELETE => delete the visualExam from the server
export function deleteVisualExam(visualExamId) {
  return axios.delete(`${COURSES_URL}/${visualExamId}`);
}

// DELETE VisualExams by ids
export function deleteVisualExams(ids) {
  return axios.post(`${COURSES_URL}/deleteVisualExams`, { ids });
}
