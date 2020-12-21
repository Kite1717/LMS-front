import axios from "axios";

export const COURSEUSERS_URL = "/course-users";

// CREATE =>  POST: add a new courseUser to the server
export function createCourseUser(courseUser) {
  return axios.post(COURSEUSERS_URL, { courseUser });
}

// READ
export function getAllCourseUsers() {
  return axios.get(COURSEUSERS_URL);
}

export function getCourseUserById(courseUserId) {
  return axios.get(`${COURSEUSERS_URL}/${courseUserId}`);
}

export function getCourseUsersTagByTopicId(topicId) {
  return axios.get(`/courseUsers-tag/${topicId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCourseUsers(queryParams) {
  return axios.post(`${COURSEUSERS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the courseUser on the server
export function updateCourseUser(courseUser) {
  return axios.put(`${COURSEUSERS_URL}/${courseUser.Id}`, { courseUser });
}

// UPDATE Status
export function updateStatusForCourseUsers(ids, status) {
  return axios.post(`${COURSEUSERS_URL}/updateStatusForCourseUsers`, {
    ids,
    status,
  });
}

// DELETE => delete the courseUser from the server
export function deleteCourseUser(courseUserId) {
  return axios.delete(`${COURSEUSERS_URL}/${courseUserId}`);
}

// DELETE CourseUsers by ids
export function deleteCourseUsers(ids) {
  return axios.post(`${COURSEUSERS_URL}/deleteCourseUsers`, { ids });
}
