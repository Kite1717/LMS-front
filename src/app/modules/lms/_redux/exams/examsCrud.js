import axios from "axios";

export const COURSES_URL = "/exams";

// CREATE =>  POST: add a new exam to the server
export function createExam(exam) {
  return axios.post(COURSES_URL, { exam });
}

// READ
export function getAllExams() {
  return axios.get(COURSES_URL);
}

export function getExamById(examId) {
  return axios.get(`${COURSES_URL}/${examId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findExams(queryParams) {
  return axios.post(`${COURSES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the exam on the server
export function updateExam(exam) {
  return axios.put(`${COURSES_URL}/${exam.values.Id}`, { exam });
}

// UPDATE Status
export function updateStatusForExams(ids, status) {
  return axios.post(`${COURSES_URL}/updateStatusForExams`, {
    ids,
    status,
  });
}

// DELETE => delete the exam from the server
export function deleteExam(examId) {
  return axios.delete(`${COURSES_URL}/${examId}`);
}

// DELETE Exams by ids
export function deleteExams(ids) {
  return axios.post(`${COURSES_URL}/deleteExams`, { ids });
}
