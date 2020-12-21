import axios from "axios";

export const COURSES_URL = "/library-categories";
export const LIBRARIES_URL = "/libraries";

// CREATE =>  POST: add a new courseLibraryCategory to the server
export function createCourseLibraryCategory(courseLibraryCategory) {
  return axios.post(COURSES_URL, { courseLibraryCategory });
}

// READ
export function getAllCourseLibraryCategories() {
  return axios.get(COURSES_URL);
}

export function getCourseLibraryCategoryById(courseLibraryCategoryId) {
  return axios.get(`${COURSES_URL}/${courseLibraryCategoryId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCourseLibraryCategories(queryParams) {
  return axios.post(`${COURSES_URL}/find`, { queryParams });
}

export function getCourseLibraryCategoriesTags(id) {
  return axios.get("/library-categories-tag");
}

// UPDATE => PUT: update the courseLibraryCategory on the server
export function updateCourseLibraryCategory(courseLibraryCategory) {
  return axios.put(`${COURSES_URL}/${courseLibraryCategory.Id}`, {
    courseLibraryCategory,
  });
}

// UPDATE Status
export function updateStatusForCourseLibraryCategories(ids, status) {
  return axios.post(`${COURSES_URL}/updateStatusForCourseLibraryCategories`, {
    ids,
    status,
  });
}

// DELETE => delete the courseLibraryCategory from the server
export function deleteCourseLibraryCategory(courseLibraryCategoryId) {
  return axios.delete(`${COURSES_URL}/${courseLibraryCategoryId}`);
}

// DELETE CourseLibraryCategories by ids
export function deleteCourseLibraryCategories(ids) {
  return axios.post(`${COURSES_URL}/deleteCourseLibraryCategories`, { ids });
}
