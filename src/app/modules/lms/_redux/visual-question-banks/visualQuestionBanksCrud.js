import axios from "axios";

export const QUESTIONS_URL = "/visual-questions/find-by-courseid";

// CREATE =>  POST: add a new questionBank to the server
export function createQuestionBank(questionBank) {
  return axios.post(QUESTIONS_URL, { questionBank });
}

export function createBulkFile(bulkFile) {
  return axios.post("/bulk-files", { bulkFile });
}

// READ
export function getAllQuestionBanks() {
  return axios.get(QUESTIONS_URL);
}

export function getQuestionBankById(questionBankId) {
  return axios.get(`${QUESTIONS_URL}/${questionBankId}`);
}

export function getQuestionBanksTagByTopicId(topicId) {
  return axios.get(`/questionBanks-tag/${topicId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findQuestionBanks(queryParams) {
  return axios.post(`${QUESTIONS_URL}`, { queryParams });
}

// UPDATE => PUT: update the questionBank on the server
export function updateQuestionBank(questionBank) {
  return axios.put(`${QUESTIONS_URL}/${questionBank.Id}`, { questionBank });
}

// UPDATE Status
export function updateStatusForQuestionBanks(ids, status) {
  return axios.post(`${QUESTIONS_URL}/updateStatusForQuestionBanks`, {
    ids,
    status,
  });
}

// DELETE => delete the questionBank from the server
export function deleteQuestionBank(questionBankId) {
  return axios.delete(`${QUESTIONS_URL}/${questionBankId}`);
}

// DELETE QuestionBanks by ids
export function deleteQuestionBanks(ids) {
  return axios.post(`${QUESTIONS_URL}/deleteQuestionBanks`, { ids });
}
