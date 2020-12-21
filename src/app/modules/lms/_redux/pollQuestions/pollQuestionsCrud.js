import axios from "axios";

export const TOPICS_URL = "/survey-questions";

// CREATE =>  POST: add a new pollQuestion to the server
export function createPollQuestion(pollQuestion) {
  return axios.post(TOPICS_URL, { pollQuestion });
}

// READ
export function getAllPollQuestions() {
  return axios.get(TOPICS_URL);
}

export function getByPollQuestionsCourseId(courseId) {
  return axios.get(`${TOPICS_URL}/course/${courseId}`);
}

export function getPollQuestionById(pollQuestionId) {
  return axios.get(`${TOPICS_URL}/${pollQuestionId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findPollQuestions(queryParams) {
  return axios.post(`${TOPICS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the pollQuestion on the server
export function updatePollQuestion(pollQuestion) {
  return axios.put(`${TOPICS_URL}/${pollQuestion.Id}`, { pollQuestion });
}

// UPDATE Status
export function updateStatusForPollQuestions(ids, status) {
  return axios.post(`${TOPICS_URL}/updateStatusForPollQuestions`, {
    ids,
    status,
  });
}

// DELETE => delete the pollQuestion from the server
export function deletePollQuestion(pollQuestionId) {
  return axios.delete(`${TOPICS_URL}/${pollQuestionId}`);
}

// DELETE PollQuestions by ids
export function deletePollQuestions(ids) {
  return axios.post(`${TOPICS_URL}/deletePollQuestions`, { ids });
}
