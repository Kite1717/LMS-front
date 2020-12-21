import axios from "axios";

export const COURSES_URL = "/course-package-companies";

// CREATE =>  POST: add a new coursePackageCompany to the server
export function createCoursePackageCompany(coursePackageCompany) {
  return axios.post(COURSES_URL, { coursePackageCompany });
}

// READ
export function getAllCoursePackageCompanies() {
  return axios.get(COURSES_URL);
}

export function getCoursePackageCompanyById(coursePackageCompanyId) {
  return axios.get(`${COURSES_URL}/${coursePackageCompanyId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCoursePackageCompanies(queryParams) {
  return axios.post(`${COURSES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the coursePackageCompany on the server
export function updateCoursePackageCompany(coursePackageCompany) {
  return axios.put(`${COURSES_URL}/${coursePackageCompany.Id}`, {
    coursePackageCompany,
  });
}

// UPDATE Status
export function updateStatusForCoursePackageCompanies(ids, status) {
  return axios.post(`${COURSES_URL}/updateStatusForCoursePackageCompanies`, {
    ids,
    status,
  });
}

// DELETE => delete the coursePackageCompany from the server
export function deleteCoursePackageCompany(coursePackageCompanyId) {
  return axios.delete(`${COURSES_URL}/${coursePackageCompanyId}`);
}

// DELETE CoursePackageCompanies by ids
export function deleteCoursePackageCompanies(ids) {
  return axios.post(`${COURSES_URL}/deleteCoursePackageCompanies`, { ids });
}
