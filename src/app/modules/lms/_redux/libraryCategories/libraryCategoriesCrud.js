import axios from "axios";

export const COURSES_URL = "/library-categories";

// CREATE =>  POST: add a new libraryCategory to the server
export function createLibraryCategory(libraryCategory) {
  return axios.post(COURSES_URL, { libraryCategory });
}

// READ
export function getAllLibraryCategories() {
  return axios.get(COURSES_URL);
}

export function getLibraryCategoryById(libraryCategoryId) {
  return axios.get(`${COURSES_URL}/${libraryCategoryId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findLibraryCategories(queryParams) {
  return axios.post(`${COURSES_URL}/find`, { queryParams });
}

export function getLibraryCategoriesTags(id) {
  return axios.get("/library-categories-tag");
}

// UPDATE => PUT: update the libraryCategory on the server
export function updateLibraryCategory(libraryCategory) {
  return axios.put(`${COURSES_URL}/${libraryCategory.Id}`, { libraryCategory });
}

// UPDATE Status
export function updateStatusForLibraryCategories(ids, status) {
  return axios.post(`${COURSES_URL}/updateStatusForLibraryCategories`, {
    ids,
    status,
  });
}

// DELETE => delete the libraryCategory from the server
export function deleteLibraryCategory(libraryCategoryId) {
  return axios.delete(`${COURSES_URL}/${libraryCategoryId}`);
}

// DELETE LibraryCategories by ids
export function deleteLibraryCategories(ids) {
  return axios.post(`${COURSES_URL}/deleteLibraryCategories`, { ids });
}
