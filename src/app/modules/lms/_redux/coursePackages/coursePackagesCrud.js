import axios from "axios";

export const COURSEPACKAGES_URL = "/course-packages";

// CREATE =>  POST: add a new coursePackage to the server
export function createCoursePackage(coursePackage) {
  return axios.post(COURSEPACKAGES_URL, { coursePackage });
}

// READ
export function getAllCoursePackages() {
  return axios.get(COURSEPACKAGES_URL);
}

export function getCoursePackageById(coursePackageId) {
  return axios.get(`${COURSEPACKAGES_URL}/${coursePackageId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCoursePackages(queryParams) {
  return axios.post(`${COURSEPACKAGES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the coursePackage on the server
export function updateCoursePackage(coursePackage) {
  return axios.put(`${COURSEPACKAGES_URL}/${coursePackage.Id}`, {
    coursePackage,
  });
}

// UPDATE Status
export function updateStatusForCoursePackages(ids, status) {
  return axios.post(`${COURSEPACKAGES_URL}/updateStatusForCoursePackages`, {
    ids,
    status,
  });
}

// DELETE => delete the coursePackage from the server
export function deleteCoursePackage(coursePackageId) {
  return axios.delete(`${COURSEPACKAGES_URL}/${coursePackageId}`);
}

// DELETE CoursePackages by ids
export function deleteCoursePackages(ids) {
  return axios.post(`${COURSEPACKAGES_URL}/deleteCoursePackages`, { ids });
}
