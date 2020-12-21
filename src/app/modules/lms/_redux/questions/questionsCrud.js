import axios from "axios";

export const QUESTIONS_URL = "/questions";

// CREATE =>  POST: add a new question to the server
export function createQuestion(question) {
  return axios.post(QUESTIONS_URL, { question });
}

export function createBulkFile(bulkFile) {
  return axios.post("/bulk-files", { bulkFile });
}

// READ
export function getAllQuestions() {
  return axios.get(QUESTIONS_URL);
}

export function getQuestionById(questionId) {
  return axios.get(`${QUESTIONS_URL}/${questionId}`);
}

export function getQuestionsTagByTopicId(topicId) {
  return axios.get(`/questions-tag/${topicId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findQuestions(queryParams) {
  return axios.post(`${QUESTIONS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the question on the server
export function updateQuestion(question) {
  return axios.put(`${QUESTIONS_URL}/${question.Id}`, { question });
}

// UPDATE Status
export function updateStatusForQuestions(ids, status) {
  return axios.post(`${QUESTIONS_URL}/updateStatusForQuestions`, {
    ids,
    status,
  });
}

// DELETE => delete the question from the server
export function deleteQuestion(questionId) {
  return axios.delete(`${QUESTIONS_URL}/${questionId}`);
}

// DELETE Questions by ids
export function deleteQuestions(ids) {
  return axios.post(`${QUESTIONS_URL}/deleteQuestions`, { ids });
}
