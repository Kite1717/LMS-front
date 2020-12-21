export const LibraryStatusCssClasses = ["danger", "success", "info", ""];
export const LibraryStatusTitles = ["Suspended", "Active", "Pending", ""];
export const LibraryTypeCssClasses = ["success", "primary", ""];
export const LibraryTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "Id", order: "desc" }];
export const sizePerPageList = [
  { text: "30", value: 15 },
  { text: "20", value: 10 },
  { text: "10", value: 5 },
  { text: "5", value: 2 },
];
export const initialFilter = {
  filter: {
    Code: "",
    CourseId: 0,
    CategoryId: 0,
  },
  sortOrder: "desc", // asc||desc
  sortField: "Id",
  pageNumber: 1,
  pageSize: 30,
};
