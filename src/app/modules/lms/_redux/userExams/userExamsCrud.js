import axios from "axios";

export const USEREXAMS_URL = "/user-exams";

// CREATE =>  POST: add a new userExam to the server
export function createUserExam(userExam) {
  return axios.post(USEREXAMS_URL, { userExam });
}

// READ
export function getAllUserExams() {
  return axios.get(USEREXAMS_URL);
}

export function getUserExamById(userExamId) {
  return axios.get(`${USEREXAMS_URL}/${userExamId}`);
}

export function getUserExamsTagByTopicId(topicId) {
  return axios.get(`/userExams-tag/${topicId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findUserExams(queryParams) {
  return axios.post(`${USEREXAMS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the userExam on the server
export function updateUserExam(userExam) {
  return axios.put(`${USEREXAMS_URL}/${userExam.Id}`, { userExam });
}

// UPDATE Status
export function updateStatusForUserExams(ids, status) {
  return axios.post(`${USEREXAMS_URL}/updateStatusForUserExams`, {
    ids,
    status,
  });
}

// DELETE => delete the userExam from the server
export function deleteUserExam(userExamId) {
  return axios.delete(`${USEREXAMS_URL}/${userExamId}`);
}

// DELETE UserExams by ids
export function deleteUserExams(ids) {
  return axios.post(`${USEREXAMS_URL}/deleteUserExams`, { ids });
}
