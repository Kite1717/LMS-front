export const UserStatusCssClasses = ["danger", "success", "info", ""];
export const UserStatusTitles = ["Suspended", "Active", "Pending", ""];
export const UserTypeCssClasses = ["success", "primary", ""];
export const UserTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "Id", order: "desc" }];
export const sizePerPageList = [
  { text: "30", value: 15 },
  { text: "20", value: 10 },
  { text: "10", value: 5 },
  { text: "5", value: 2 },
];
export const initialFilter = {
  filter: {
    Username: "",
    FirstName: "",
    LastName: "",
    CompanyId: 0, //TODO: 1 check
  },
  sortOrder: "desc", // asc||desc
  sortField: "Id",
  pageNumber: 1,
  pageSize: 30,
};
