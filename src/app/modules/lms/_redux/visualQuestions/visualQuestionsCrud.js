import axios from "axios";

export const COURSES_URL = "/visual-questions";

// CREATE =>  POST: add a new visualQuestion to the server
export function createVisualQuestion(visualQuestion) {
  return axios.post(COURSES_URL, { visualQuestion });
}

// READ
export function getAllVisualQuestions() {
  return axios.get(COURSES_URL);
}

export function getVisualQuestionById(visualQuestionId) {
  return axios.get(`${COURSES_URL}/${visualQuestionId}`);
}

export function getVisualQuestionsTagByTopicId(topicId) {
  return axios.get(`/visual-questions-tag/${topicId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findVisualQuestions(queryParams) {
  return axios.post(`${COURSES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the visualQuestion on the server
export function updateVisualQuestion(visualQuestion) {
  return axios.put(`${COURSES_URL}/${visualQuestion.Id}`, { visualQuestion });
}

// UPDATE Status
export function updateStatusForVisualQuestions(ids, status) {
  return axios.post(`${COURSES_URL}/updateStatusForVisualQuestions`, {
    ids,
    status,
  });
}

// DELETE => delete the visualQuestion from the server
export function deleteVisualQuestion(visualQuestionId) {
  return axios.delete(`${COURSES_URL}/${visualQuestionId}`);
}

// DELETE VisualQuestions by ids
export function deleteVisualQuestions(ids) {
  return axios.post(`${COURSES_URL}/deleteVisualQuestions`, { ids });
}
