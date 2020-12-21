import axios from "axios";

export const COURSES_URL = "/courses";

// CREATE =>  POST: add a new course to the server
export function createCourse(course) {
  return axios.post(COURSES_URL, { course });
}

// READ
export function getAllCourses() {
  return axios.get(COURSES_URL);
}

export function getCourseById(courseId) {
  return axios.get(`${COURSES_URL}/${courseId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCourses(queryParams) {
  return axios.post(`${COURSES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the course on the server
export function updateCourse(course) {
  return axios.put(`${COURSES_URL}/${course.Id}`, { course });
}

// UPDATE Status
export function updateStatusForCourses(ids, status) {
  return axios.post(`${COURSES_URL}/updateStatusForCourses`, {
    ids,
    status,
  });
}

// DELETE => delete the course from the server
export function deleteCourse(courseId) {
  return axios.delete(`${COURSES_URL}/${courseId}`);
}

// DELETE Courses by ids
export function deleteCourses(ids) {
  return axios.post(`${COURSES_URL}/deleteCourses`, { ids });
}
