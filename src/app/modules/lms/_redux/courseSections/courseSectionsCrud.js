import axios from "axios";

export const COURSES_URL = "/course-sections";

// CREATE =>  POST: add a new courseSection to the server
export function createCourseSection(courseSection) {
  return axios.post(COURSES_URL, { courseSection });
}

// READ
export function getAllCourseSections() {
  return axios.get(COURSES_URL);
}

export function getCourseSectionById(courseSectionId) {
  return axios.get(`${COURSES_URL}/${courseSectionId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCourseSections(queryParams) {
  return axios.post(`${COURSES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the courseSection on the server
export function updateCourseSection(courseSection) {
  return axios.put(`${COURSES_URL}/${courseSection.Id}`, { courseSection });
}

// UPDATE Status
export function updateStatusForCourseSections(ids, status) {
  return axios.post(`${COURSES_URL}/updateStatusForCourseSections`, {
    ids,
    status,
  });
}

// DELETE => delete the courseSection from the server
export function deleteCourseSection(courseSectionId) {
  return axios.delete(`${COURSES_URL}/${courseSectionId}`);
}

// DELETE CourseSections by ids
export function deleteCourseSections(ids) {
  return axios.post(`${COURSES_URL}/deleteCourseSections`, { ids });
}
