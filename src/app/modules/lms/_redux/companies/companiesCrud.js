import axios from "axios";

export const COMPANIES_URL = "/companies";

// CREATE =>  POST: add a new company to the server
export function createCompany(company) {
  return axios.post(COMPANIES_URL, { company });
}

// READ
export function getAllCompaniesTags() {
  return axios.get(`/companies-tag`);
}

// READ
export function getAllCompanies() {
  return axios.get(COMPANIES_URL);
}

export function getCompanyById(companyId) {
  return axios.get(`${COMPANIES_URL}/${companyId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCompanies(queryParams) {
  return axios.post(`${COMPANIES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the company on the server
export function updateCompany(company) {
  return axios.put(`${COMPANIES_URL}/${company.Id}`, { company });
}

// UPDATE Status
export function updateStatusForCompanies(ids, status) {
  return axios.post(`${COMPANIES_URL}/updateStatusForCompanies`, {
    ids,
    status,
  });
}

// DELETE => delete the company from the server
export function deleteCompany(companyId) {
  return axios.delete(`${COMPANIES_URL}/${companyId}`);
}

// DELETE Companies by ids
export function deleteCompanies(ids) {
  return axios.post(`${COMPANIES_URL}/deleteCompanies`, { ids });
}

