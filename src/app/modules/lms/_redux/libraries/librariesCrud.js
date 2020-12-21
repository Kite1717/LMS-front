import axios from "axios";

export const COURSES_URL = "/libraries";

// CREATE =>  POST: add a new library to the server
export function createLibrary(library) {
  return axios.post(COURSES_URL, { library });
}

// READ
export function getAllLibraries() {
  return axios.get(COURSES_URL);
}

export function getLibraryById(libraryId) {
  return axios.get(`${COURSES_URL}/${libraryId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findLibraries(queryParams) {
  return axios.post(`${COURSES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the library on the server
export function updateLibrary(library) {
  return axios.put(`${COURSES_URL}/${library.Id}`, { library });
}

// UPDATE Status
export function updateStatusForLibraries(ids, status) {
  return axios.post(`${COURSES_URL}/updateStatusForLibraries`, {
    ids,
    status,
  });
}

// DELETE => delete the library from the server
export function deleteLibrary(libraryId) {
  return axios.delete(`${COURSES_URL}/${libraryId}`);
}

// DELETE Libraries by ids
export function deleteLibraries(ids) {
  return axios.post(`${COURSES_URL}/deleteLibraries`, { ids });
}
